from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.dependencies import get_current_user
from app.models.report import Report
from app.models.report_template import ReportTemplate
from app.models.user import User
from app.schemas.report_template import (
    TemplateCreate,
    TemplateResponse,
    TemplateUpdate,
)

router = APIRouter(
    prefix="/templates",
    tags=["Report Templates"],
)


@router.post(
    "",
    response_model=TemplateResponse,
)
def create_template(
    request: TemplateCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):

    template = ReportTemplate(
        name=request.name,
        description=request.description,
        configuration=request.configuration,
        created_by=current_user.id,
    )

    db.add(template)
    db.commit()
    db.refresh(template)

    return template


@router.get(
    "",
    response_model=list[TemplateResponse],
)
def get_templates(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):

    return db.query(
        ReportTemplate
    ).filter(
        ReportTemplate.created_by == current_user.id
    ).all()


@router.get(
    "/{template_id}",
    response_model=TemplateResponse,
)
def get_template(
    template_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):

    template = db.query(
        ReportTemplate
    ).filter(
        ReportTemplate.id == template_id,
        ReportTemplate.created_by == current_user.id,
    ).first()

    if not template:
        raise HTTPException(
            status_code=404,
            detail="Template not found",
        )

    return template


@router.put(
    "/{template_id}",
    response_model=TemplateResponse,
)
def update_template(
    template_id: int,
    request: TemplateUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):

    template = db.query(
        ReportTemplate
    ).filter(
        ReportTemplate.id == template_id,
        ReportTemplate.created_by == current_user.id,
    ).first()

    if not template:
        raise HTTPException(
            status_code=404,
            detail="Template not found",
        )

    if request.name is not None:
        template.name = request.name

    if request.description is not None:
        template.description = request.description

    if request.configuration is not None:
        template.configuration = request.configuration

    db.commit()
    db.refresh(template)

    return template


@router.delete(
    "/{template_id}",
)
def delete_template(
    template_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):

    template = db.query(
        ReportTemplate
    ).filter(
        ReportTemplate.id == template_id,
        ReportTemplate.created_by == current_user.id,
    ).first()

    if not template:
        raise HTTPException(
            status_code=404,
            detail="Template not found",
        )

    db.delete(template)
    db.commit()

    return {
        "message": "Template deleted successfully"
    }


@router.post(
    "/{template_id}/create-report",
)
def create_report_from_template(
    template_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    ),
):

    template = db.query(
        ReportTemplate
    ).filter(
        ReportTemplate.id == template_id,
        ReportTemplate.created_by == current_user.id,
    ).first()

    if not template:
        raise HTTPException(
            status_code=404,
            detail="Template not found",
        )

    report = Report(
        name=f"{template.name} Report",
        description=template.description,
        configuration=template.configuration,
        owner_id=current_user.id,
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return report