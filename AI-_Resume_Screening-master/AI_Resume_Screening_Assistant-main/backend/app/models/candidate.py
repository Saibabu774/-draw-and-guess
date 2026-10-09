from sqlalchemy import Column
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text

from sqlalchemy.orm import relationship

from app.models.base_model import BaseModel


class Candidate(BaseModel):

    __tablename__ = "candidates"

    full_name = Column(
        String(100),
        nullable=False
    )

    email = Column(
        String(150),
        unique=True,
        nullable=False
    )

    phone = Column(
        String(20)
    )

    resume_file = Column(
        String(255),
        nullable=False
    )

    resume_text = Column(
        Text,
        nullable=False
    )

    uploaded_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    uploaded_by_user = relationship(
        "User",
        back_populates="candidates"
    )

    candidate_skills = relationship(
        "CandidateSkill",
        back_populates="candidate",
        cascade="all, delete-orphan"
    )

    educations = relationship(
        "CandidateEducation",
        back_populates="candidate",
        cascade="all, delete-orphan"
    )

    experiences = relationship(
        "CandidateExperience",
        back_populates="candidate",
        cascade="all, delete-orphan"
    )

    analyses = relationship(
        "ResumeAnalysis",
        back_populates="candidate",
        cascade="all, delete-orphan"
    )

    interview_questions = relationship(
        "InterviewQuestion",
        back_populates="candidate",
        cascade="all, delete-orphan"
    )