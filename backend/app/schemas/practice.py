from datetime import datetime
from pydantic import BaseModel, Field


class PracticeCreate(BaseModel):
    title: str = Field(min_length=2, max_length=255)
    description: str = ""
    task_text: str = Field(min_length=5)
    max_score: int = Field(ge=1, le=100)
    is_published: bool = True


class PracticeOut(PracticeCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True