from sqlalchemy.orm import Session

from app.models.resume_analysis import ResumeAnalysis

from app.schemas.history import HistoryResponse


class HistoryService:

    def __init__(
        self,
        db: Session
    ):

        self.db = db

    def get_history(self):

        history = (
            self.db.query(
                ResumeAnalysis
            )
            .order_by(
                ResumeAnalysis.created_at.desc()
            )
            .all()
        )

        response = []

        for item in history:

            response.append(

                HistoryResponse(

                    candidate_name=item.candidate.full_name,

                    job_title=item.job.title,

                    match_score=item.match_score,

                    matching_skills=item.matching_skills,

                    missing_skills=item.missing_skills,

                    strengths=item.strengths,

                    weaknesses=item.weaknesses,

                    recommendation=item.recommendation
                )
            )

        return response