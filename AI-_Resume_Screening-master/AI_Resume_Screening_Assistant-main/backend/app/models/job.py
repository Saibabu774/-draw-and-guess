from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import Text

from sqlalchemy.orm import relationship

from app.models.base_model import BaseModel


class Job(BaseModel):

    __tablename__ = "jobs"

    title = Column(
        String(150),
        nullable=False
    )

    job_skills = relationship(
        "JobSkill",
        back_populates="job",
        cascade="all, delete-orphan"
    )

    experience_required = Column(
        String(100)
    )

    location = Column(
        String(100)
    )

    employment_type = Column(
        String(50)
    )

    description = Column(Text)

    analyses = relationship(
        "ResumeAnalysis",
        back_populates="job"
    )