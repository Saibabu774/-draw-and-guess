from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from app.models.base_model import BaseModel


class CandidateEducation(BaseModel):

    __tablename__ = "candidate_educations"

    candidate_id = Column(
        Integer,
        ForeignKey("candidates.id"),
        nullable=False
    )

    degree = Column(
        String(150),
        nullable=False
    )

    institution = Column(
        String(255)
    )

    field_of_study = Column(
        String(150)
    )

    start_year = Column(
        Integer
    )

    end_year = Column(
        Integer
    )

    grade = Column(
        String(50)
    )

    candidate = relationship(
        "Candidate",
        back_populates="educations"
    )