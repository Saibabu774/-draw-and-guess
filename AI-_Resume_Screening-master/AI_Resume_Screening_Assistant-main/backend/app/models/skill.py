from sqlalchemy import Column
from sqlalchemy import String

from sqlalchemy.orm import relationship

from app.models.base_model import BaseModel


class Skill(BaseModel):

    __tablename__ = "skills"

    name = Column(
        String(100),
        unique=True,
        nullable=False
    )

    candidate_skills = relationship(
        "CandidateSkill",
        back_populates="skill",
        cascade="all, delete-orphan"
    )

    job_skills = relationship(
        "JobSkill",
        back_populates="skill",
        cascade="all, delete-orphan"
    )