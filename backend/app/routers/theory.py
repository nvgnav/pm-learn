from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.theory import TheoryMaterial
from app.schemas.theory import TheoryCreate, TheoryOut
from app.routers.users import get_current_user, require_roles
from app.models.user import User

router = APIRouter(prefix="/theory", tags=["Theory"])


@router.get("", response_model=list[TheoryOut])
def list_theory(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user)
):
    return db.query(TheoryMaterial).filter(TheoryMaterial.is_published == True).order_by(TheoryMaterial.order_index).all()


@router.post("", response_model=TheoryOut)
def create_theory(
    data: TheoryCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "teacher"))
):
    item = TheoryMaterial(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}", response_model=TheoryOut)
def update_theory(
    item_id: int,
    data: TheoryCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "teacher"))
):
    item = db.query(TheoryMaterial).filter(TheoryMaterial.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Теоретический материал не найден")

    for key, value in data.model_dump().items():
        setattr(item, key, value)

    db.commit()
    db.refresh(item)
    return item