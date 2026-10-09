from typing import Optional

from pydantic import BaseModel
from pydantic import ConfigDict


class JobCreate(BaseModel):

    title: str

    experience_required: Optional[str] = None

    location: Optional[str] = None

    employment_type: Optional[str] = None

    description: str

    skills: list[str]


class JobUpdate(BaseModel):

    title: Optional[str] = None

    experience_required: Optional[str] = None

    location: Optional[str] = None

    employment_type: Optional[str] = None

    description: Optional[str] = None

    skills: Optional[list[str]] = None


class JobResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int

    title: str

    experience_required: Optional[str]

    location: Optional[str]

    employment_type: Optional[str]

    description: str

    skills: list[str]


class JobListResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    id: int

    title: str

    location: Optional[str]

    employment_type: Optional[str]


class JobDeleteResponse(BaseModel):

    message: str