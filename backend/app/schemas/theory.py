from datetime import datetime
from pydantic import BaseModel, Field


class TheoryCreate(BaseModel):
    title: str = Field(min_length=2, max_length=255)
    description: str = ""
    content: str = Field(min_length=5)
    order_index: int = 0
    is_published: bool = True


class TheoryOut(TheoryCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True