from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from app.models.candidate import Candidate
from app.models.job import Job
from app.models.interview_question import InterviewQuestion

from app.schemas.ai import (
    InterviewQuestionRequest,
    InterviewQuestionResponse
)

from app.prompts.interview_question_prompt import (
    get_interview_question_prompt
)

from app.services.gemini_service import GeminiService


class InterviewService:

    def __init__(self, db: Session):

        self.db = db
        self.gemini = GeminiService()

    def generate_questions(
        self,
        request: InterviewQuestionRequest
    ) -> InterviewQuestionResponse:

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

        job = (
            self.db.query(Job)
            .filter(
                Job.id == request.job_id,
                Job.is_deleted == False
            )
            .first()
        )

        if job is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Job not found."
            )

        prompt = get_interview_question_prompt(
            resume_text=candidate.resume_text,
            job_title=job.title,
            job_description=job.description
        )

        response = self.gemini.generate_json(
            prompt
        )

        interview = InterviewQuestion(
            candidate_id=candidate.id,
            job_id=job.id,
            technical_questions="\n".join(
                response.get(
                    "technical_questions",
                    []
                )
            ),
            hr_questions="\n".join(
                response.get(
                    "hr_questions",
                    []
                )
            ),
            behavioral_questions="\n".join(
                response.get(
                    "behavioral_questions",
                    []
                )
            )
        )

        self.db.add(interview)

        self.db.commit()

        return InterviewQuestionResponse(
            technical_questions=response.get(
                "technical_questions",
                []
            ),
            hr_questions=response.get(
                "hr_questions",
                []
            ),
            behavioral_questions=response.get(
                "behavioral_questions",
                []
            )
        )