from datetime import datetime
from pydantic import BaseModel


class ReportOut(BaseModel):
    message: str
    file_path: str
    created_at: datetime