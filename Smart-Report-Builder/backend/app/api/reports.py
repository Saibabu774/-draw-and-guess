from app.models.report_execution import ReportExecution
from app.schemas.report_execution import ReportExecutionResponse
@router.post(
    "/{report_id}/execute",
)
def execute_report(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):

    report = db.query(Report).filter(
        Report.id == report_id,
        Report.owner_id == current_user.id,
    ).first()

    if not report:
        raise HTTPException(
            status_code=404,
            detail="Report not found",
        )

    try:
        execution = ReportExecution(
            report_id=report.id,
            executed_by=current_user.id,
            status="SUCCESS",
            row_count=0,
        )

        db.add(execution)
        db.commit()
        db.refresh(execution)

        return {
            "message": "Report executed successfully",
            "execution_id": execution.id,
            "status": "SUCCESS",
        }

    except Exception as exc:
        db.rollback()

        execution = ReportExecution(
            report_id=report.id,
            executed_by=current_user.id,
            status="FAILED",
            row_count=0,
            error_message=str(exc),
        )

        db.add(execution)
        db.commit()

        raise HTTPException(
            status_code=500,
            detail="Report execution failed",
        )


@router.get(
    "/{report_id}/history",
    response_model=list[ReportExecutionResponse],
)
def execution_history(
    report_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):

    report = db.query(Report).filter(
        Report.id == report_id,
        Report.owner_id == current_user.id,
    ).first()

    if not report:
        raise HTTPException(
            status_code=404,
            detail="Report not found",
        )

    return db.query(
        ReportExecution
    ).filter(
        ReportExecution.report_id == report_id
    ).order_by(
        ReportExecution.executed_at.desc()
    ).all()