from datetime import datetime
from pydantic import BaseModel
from typing import Any


class PracticeResultCreate(BaseModel):
    variant_id: str
    variant_title: str
    variant_type: str
    student_data: Any
    errors: Any
    total_errors: int


class PracticeResultOut(BaseModel):
    id: int
    topic: str
    variant_id: str
    variant_title: str
    variant_type: str
    student_data: Any
    errors: Any
    total_errors: int
    created_at: datetime

    class Config:
        from_attributes = True