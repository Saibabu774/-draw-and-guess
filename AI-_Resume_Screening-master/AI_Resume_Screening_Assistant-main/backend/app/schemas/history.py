from pydantic import BaseModel
from pydantic import ConfigDict


class HistoryResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    candidate_name: str

    job_title: str

    match_score: float

    matching_skills: str

    missing_skills: str

    strengths: str

    weaknesses: str

    recommendation: str