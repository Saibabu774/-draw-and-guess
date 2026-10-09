from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from app.models.base_model import BaseModel


class CandidateSkill(BaseModel):

    __tablename__ = "candidate_skills"

    candidate_id = Column(
        Integer,
        ForeignKey("candidates.id"),
        nullable=False
    )

    skill_id = Column(
        Integer,
        ForeignKey("skills.id"),
        nullable=False
    )

    candidate = relationship(
        "Candidate",
        back_populates="candidate_skills"
    )

    skill = relationship(
        "Skill",
        back_populates="candidate_skills"
    )