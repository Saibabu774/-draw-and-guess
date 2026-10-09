from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.candidate import Candidate

from app.schemas.ai import (
    SummaryRequest,
    SummaryResponse
)

from app.prompts.candidate_summary_prompt import (
    get_candidate_summary_prompt
)

from app.services.gemini_service import GeminiService


class SummaryService:

    def __init__(self, db: Session):

        self.db = db
        self.gemini = GeminiService()

    def generate_summary(
        self,
        request: SummaryRequest
    ) -> SummaryResponse:

        candidate = (
            self.db.query(Candidate)
            .filter(
                Candidate.id == request.candidate_id,
                Candidate.is_deleted == False
            )
            .first()
        )

        if candidate is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Candidate not found."
            )

        prompt = get_candidate_summary_prompt(
            resume_text=candidate.resume_text
        )

        response = self.gemini.generate_json(
            prompt
        )

        return SummaryResponse(
            candidate_overview=response.get(
                "candidate_overview",
                ""
            ),
            skill_assessment=response.get(
                "skill_assessment",
                ""
            ),
            experience_summary=response.get(
                "experience_summary",
                ""
            ),
            hiring_recommendation=response.get(
                "hiring_recommendation",
                ""
            )
        )