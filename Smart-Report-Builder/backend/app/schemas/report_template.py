from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict


class TemplateCreate(BaseModel):
    name: str
    description: str | None = None
    configuration: dict[str, Any]


class TemplateUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    configuration: dict[str, Any] | None = None


class TemplateResponse(BaseModel):
    id: int
    name: str
    description: str | None
    configuration: dict[str, Any]
    created_by: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )