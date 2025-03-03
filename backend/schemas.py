from pydantic import BaseModel, Field
from datetime import date

class NoteSchema(BaseModel):
    id: int = Field(..., gt=0, description="Id must be greater than 0")
    title: str = Field(..., min_length=1, description="Title must be provided")
    content: str = Field(..., min_length=1, description="Content must be provided")
    date: date