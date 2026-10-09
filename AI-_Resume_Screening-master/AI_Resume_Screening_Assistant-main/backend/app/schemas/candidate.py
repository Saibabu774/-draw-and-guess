from datetime import date
from typing import Optional

from pydantic import BaseModel, ConfigDict, EmailStr


class CandidateCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None


class CandidateResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    email: EmailStr
    phone: Optional[str]
    resume_file: Optional[str]
    created_at: date
    resume_text: Optional[str] = None


class CandidateListResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    full_name: str
    email: EmailStr


class CandidateDeleteResponse(BaseModel):
    message: str