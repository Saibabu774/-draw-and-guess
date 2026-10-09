from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from app.models.base_model import BaseModel


class Role(BaseModel):

    __tablename__ = "roles"

    name = Column(
        String(50),
        unique=True,
        nullable=False
    )

    users = relationship(
        "User",
        back_populates="role"
    )