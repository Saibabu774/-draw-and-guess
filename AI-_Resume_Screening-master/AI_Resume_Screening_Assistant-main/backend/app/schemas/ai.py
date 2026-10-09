from pydantic import BaseModel
from pydantic import ConfigDict


class MatchRequest(BaseModel):

    candidate_id: int

    job_id: int


class MatchResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    match_score: int

    matching_skills: list[str]

    missing_skills: list[str]

    strengths: list[str]

    weaknesses: list[str]

    recommendation: str


class SummaryRequest(BaseModel):

    candidate_id: int


class SummaryResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    candidate_overview: str

    skill_assessment: str

    experience_summary: str

    hiring_recommendation: str


class InterviewQuestionRequest(BaseModel):

    candidate_id: int

    job_id: int


class InterviewQuestionResponse(BaseModel):

    model_config = ConfigDict(
        from_attributes=True
    )

    technical_questions: list[str]

    hr_questions: list[str]

    behavioral_questions: list[str]

