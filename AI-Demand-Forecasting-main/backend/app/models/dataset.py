from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
    Index
)

from sqlalchemy.sql import func

from app.database import Base


class Dataset(Base):

    __tablename__ = "datasets"

    # ==================================
    # PRIMARY KEY
    # ==================================

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # ==================================
    # DATASET DETAILS
    # ==================================

    filename = Column(
        String(255),
        nullable=False,
        index=True
    )

    file_path = Column(
        String(500),
        nullable=False
    )

    # ==================================
    # USER RELATION
    # ==================================

    uploaded_by = Column(

        Integer,

        ForeignKey("users.id"),

        nullable=False,

        index=True
    )

    # ==================================
    # CREATED DATE
    # ==================================

    created_at = Column(

        DateTime(timezone=True),

        server_default=func.now(),

        index=True
    )

    # ==================================
    # DATABASE INDEX OPTIMIZATION
    # ==================================

    __table_args__ = (

        Index(
            "idx_dataset_uploaded_by",
            "uploaded_by"
        ),

        Index(
            "idx_dataset_created_at",
            "created_at"
        ),

        Index(
            "idx_dataset_filename",
            "filename"
        ),
    )