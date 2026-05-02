from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import verify_password, create_access_token, hash_password
from app.models.user import User
from app.schemas.user import UserLogin, UserCreate, UserOut

router = APIRouter(prefix="/auth", tags=["Auth"])

ADMIN_EMAIL = "admin@pmlearn.com"
ADMIN_PASSWORD = "SUPER_ADMIN_123_!PMLEARN"
ADMIN_FULL_NAME = "Администратор"


@router.post("/register", response_model=UserOut, status_code=201)
def register(data: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Пользователь с таким email уже существует",
        )

    user = User(
        full_name=data.full_name,
        email=data.email,
        password_hash=hash_password(data.password),
        role="student",
        group_name=data.group_name,
        is_active=True,
    )

    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@router.post("/login")
def login(data: UserLogin, db: Session = Depends(get_db)):
    # Отдельный вход администратора по статичным данным
    if data.email == ADMIN_EMAIL and data.password == ADMIN_PASSWORD:
        token = create_access_token({"sub": "0", "role": "admin"})
        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": 0,
                "full_name": ADMIN_FULL_NAME,
                "email": ADMIN_EMAIL,
                "role": "admin",
                "group_name": None,
            },
        }

    user = db.query(User).filter(User.email == data.email).first()

    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный email или пароль",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Пользователь деактивирован",
        )

    token = create_access_token({"sub": str(user.id), "role": user.role})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role": user.role,
            "group_name": user.group_name,
        },
    }