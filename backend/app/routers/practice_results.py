from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.practice_result import PracticeResult
from app.models.user import User
from app.routers.users import get_current_user
from app.schemas.practice_result import PracticeResultCreate, PracticeResultOut

router = APIRouter(prefix="/practice-results", tags=["practice-results"])


@router.post("/", response_model=PracticeResultOut)
def create_practice_result(
    data: PracticeResultCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = PracticeResult(
        user_id=current_user.id,
        variant_id=data.variant_id,
        variant_title=data.variant_title,
        variant_type=data.variant_type,
        student_data=data.student_data,
        errors=data.errors,
        total_errors=data.total_errors,
    )

    db.add(result)
    db.commit()
    db.refresh(result)

    return result


@router.get("/", response_model=list[PracticeResultOut])
def get_my_practice_results(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return (
        db.query(PracticeResult)
        .filter(PracticeResult.user_id == current_user.id)
        .order_by(PracticeResult.created_at.desc())
        .all()
    )