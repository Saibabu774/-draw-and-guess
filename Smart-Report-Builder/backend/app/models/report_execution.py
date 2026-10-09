from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.sql import func

from app.core.database import Base


class ReportExecution(Base):
    __tablename__ = "report_executions"

    id = Column(Integer, primary_key=True, index=True)

    report_id = Column(
        Integer,
        ForeignKey("reports.id"),
        nullable=False,
    )

    executed_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    status = Column(
        String(30),
        nullable=False,
    )

    row_count = Column(
        Integer,
        default=0,
        nullable=False,
    )

    error_message = Column(
        Text,
        nullable=True,
    )

    executed_at = Column(
        DateTime,
        server_default=func.now(),
        nullable=False,
    )