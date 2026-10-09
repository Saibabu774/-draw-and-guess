from pydantic import BaseModel
from pydantic import ConfigDict


class DashboardResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    total_candidates: int

    total_jobs: int

    total_resume_analysis: int

    average_match_score: float

    recent_candidates: int