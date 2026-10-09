from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict


class ReportCreate(BaseModel):
    name: str
    description: str | None = None
    configuration: dict[str, Any]


class ReportUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    configuration: dict[str, Any] | None = None


class ReportResponse(BaseModel):
    id: int
    name: str
    description: str | None
    owner_id: int
    configuration: dict[str, Any]
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )