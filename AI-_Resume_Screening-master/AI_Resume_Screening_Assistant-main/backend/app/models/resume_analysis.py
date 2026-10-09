from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Float
from sqlalchemy import Text
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from app.models.base_model import BaseModel


class ResumeAnalysis(BaseModel):

    __tablename__ = "resume_analysis"

    candidate_id = Column(
        Integer,
        ForeignKey("candidates.id")
    )

    job_id = Column(
        Integer,
        ForeignKey("jobs.id")
    )

    match_score = Column(Float)

    strengths = Column(Text)

    weaknesses = Column(Text)

    missing_skills = Column(Text)

    recommendation = Column(Text)

    matching_skills = Column(Text)

    candidate = relationship(
        "Candidate",
        back_populates="analyses"
    )

    job = relationship(
        "Job",
        back_populates="analyses"
    )
    