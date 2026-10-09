from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.candidate import Candidate
from app.models.job import Job
from app.models.resume_analysis import ResumeAnalysis

from app.schemas.dashboard import DashboardResponse


class DashboardService:

    def __init__(
        self,
        db: Session
    ):
        self.db = db

    def get_dashboard(self) -> DashboardResponse:

        total_candidates = (
            self.db.query(Candidate)
            .filter(
                Candidate.is_deleted == False
            )
            .count()
        )

        total_jobs = (
            self.db.query(Job)
            .filter(
                Job.is_deleted == False
            )
            .count()
        )

        total_resume_analysis = (
            self.db.query(ResumeAnalysis)
            .count()
        )

        average_match_score = (
            self.db.query(
                func.avg(
                    ResumeAnalysis.match_score
                )
            )
            .scalar()
        )

        if average_match_score is None:
            average_match_score = 0

        recent_candidates = (
            self.db.query(Candidate)
            .filter(
                Candidate.is_deleted == False
            )
            .order_by(
                Candidate.created_at.desc()
            )
            .limit(5)
            .count()
        )

        return DashboardResponse(

            total_candidates=total_candidates,

            total_jobs=total_jobs,

            total_resume_analysis=total_resume_analysis,

            average_match_score=round(
                average_match_score,
                2
            ),

            recent_candidates=recent_candidates
        )