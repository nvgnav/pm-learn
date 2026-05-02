from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.practice import PracticeTask
from app.schemas.practice import PracticeCreate, PracticeOut
from app.routers.users import get_current_user, require_roles
from app.models.user import User

router = APIRouter(prefix="/practice", tags=["Practice"])


@router.get("", response_model=list[PracticeOut])
def list_practice(
    db: Session = Depends(get_db),
    _: User = Depends(get_current_user)
):
    return db.query(PracticeTask).filter(PracticeTask.is_published == True).all()


@router.post("", response_model=PracticeOut)
def create_practice(
    data: PracticeCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "teacher"))
):
    item = PracticeTask(**data.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.put("/{item_id}", response_model=PracticeOut)
def update_practice(
    item_id: int,
    data: PracticeCreate,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "teacher"))
):
    item = db.query(PracticeTask).filter(PracticeTask.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Практическое задание не найдено")

    for key, value in data.model_dump().items():
        setattr(item, key, value)

    db.commit()
    db.refresh(item)
    return item