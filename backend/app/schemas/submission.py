from datetime import datetime
from pydantic import BaseModel, Field


class SubmissionCreate(BaseModel):
    practice_id: int
    answer_text: str = Field(min_length=1)


class SubmissionReview(BaseModel):
    score: int = Field(ge=0, le=100)
    status: str
    feedback: str = ""


class SubmissionOut(BaseModel):
    id: int
    student_id: int
    practice_id: int
    answer_text: str
    score: int | None
    status: str
    feedback: str
    created_at: datetime

    class Config:
        from_attributes = True