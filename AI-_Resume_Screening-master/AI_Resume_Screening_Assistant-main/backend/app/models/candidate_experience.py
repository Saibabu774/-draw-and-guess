from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import ForeignKey
from sqlalchemy import Boolean
from sqlalchemy.orm import relationship

from app.models.base_model import BaseModel


class CandidateExperience(BaseModel):

    __tablename__ = "candidate_experiences"

    candidate_id = Column(
        Integer,
        ForeignKey("candidates.id"),
        nullable=False
    )

    company_name = Column(
        String(200),
        nullable=False
    )

    designation = Column(
        String(150),
        nullable=False
    )

    employment_type = Column(
        String(100)
    )

    start_date = Column(
        String(50)
    )

    end_date = Column(
        String(50)
    )

    currently_working = Column(
        Boolean,
        default=False
    )

    description = Column(
        Text
    )

    candidate = relationship(
        "Candidate",
        back_populates="experiences"
    )