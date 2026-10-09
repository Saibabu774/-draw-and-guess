from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from app.models.base_model import BaseModel


class InterviewQuestion(BaseModel):

    __tablename__ = "interview_questions"

    candidate_id = Column(
        Integer,
        ForeignKey("candidates.id")
    )

    job_id = Column(
    Integer,
    ForeignKey("jobs.id")
    )
    
    technical_questions = Column(Text)

    behavioral_questions = Column(Text)

    hr_questions = Column(Text)

    candidate = relationship(
        "Candidate",
        back_populates="interview_questions"
    )