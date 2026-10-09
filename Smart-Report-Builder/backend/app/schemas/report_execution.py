from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ReportExecutionResponse(BaseModel):
    id: int
    report_id: int
    executed_by: int
    status: str
    row_count: int
    error_message: str | None
    executed_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )