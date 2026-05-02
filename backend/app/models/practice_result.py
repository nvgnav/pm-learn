from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, JSON
from sqlalchemy.sql import func

from app.core.database import Base


class PracticeResult(Base):
    __tablename__ = "practice_results"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    topic = Column(String, nullable=False, default="Управление временем проекта")
    variant_id = Column(String, nullable=False)
    variant_title = Column(String, nullable=False)
    variant_type = Column(String, nullable=False)

    student_data = Column(JSON, nullable=False)
    errors = Column(JSON, nullable=False)
    total_errors = Column(Integer, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())