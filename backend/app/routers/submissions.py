from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.submission import Submission
from app.models.practice import PracticeTask
from app.models.user import User
from app.schemas.submission import SubmissionCreate, SubmissionReview, SubmissionOut
from app.routers.users import require_roles

router = APIRouter(prefix="/submissions", tags=["Submissions"])


@router.post("", response_model=SubmissionOut)
def create_submission(
    data: SubmissionCreate,
    db: Session = Depends(get_db),
    user: User = Depends(require_roles("student"))
):
    practice = db.query(PracticeTask).filter(PracticeTask.id == data.practice_id).first()
    if not practice:
        raise HTTPException(status_code=404, detail="Практическое задание не найдено")

    submission = Submission(
        student_id=user.id,
        practice_id=data.practice_id,
        answer_text=data.answer_text
    )
    db.add(submission)
    db.commit()
    db.refresh(submission)
    return submission


@router.get("/my", response_model=list[SubmissionOut])
def my_submissions(
    db: Session = Depends(get_db),
    user: User = Depends(require_roles("student"))
):
    return db.query(Submission).filter(Submission.student_id == user.id).all()


@router.get("", response_model=list[SubmissionOut])
def all_submissions(
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "teacher"))
):
    return db.query(Submission).all()


@router.put("/{submission_id}/review", response_model=SubmissionOut)
def review_submission(
    submission_id: int,
    data: SubmissionReview,
    db: Session = Depends(get_db),
    _: User = Depends(require_roles("admin", "teacher"))
):
    submission = db.query(Submission).filter(Submission.id == submission_id).first()
    if not submission:
        raise HTTPException(status_code=404, detail="Решение не найдено")

    submission.score = data.score
    submission.status = data.status
    submission.feedback = data.feedback

    db.commit()
    db.refresh(submission)
    return submission