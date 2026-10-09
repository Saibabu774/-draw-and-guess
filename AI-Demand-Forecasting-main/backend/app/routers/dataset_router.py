import os
import shutil
import uuid
import pandas as pd
from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.dataset import Dataset
from app.models.user import User
from app.models.notification import Notification
from app.auth.oauth2 import get_current_user
from app.services.data_cleaning import clean_dataset
from app.services.auto_dataset_service import auto_process_dataset

router = APIRouter(
    prefix="/dataset",
    tags=["Dataset"]
)

UPLOAD_DIR = "uploads"

def create_notification(db: Session, user_id: int, title: str, message: str):
    """Helper to create notification"""
    try:
        notification = Notification(
            user_id=user_id,
            title=title,
            message=message
        )
        db.add(notification)
        db.commit()
    except Exception:
        db.rollback() # notification fail ayina upload aagakudadhu

@router.post("/upload")
async def upload_dataset(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        # 1. VALIDATE FILE EXTENSION
        allowed_extensions = [".csv", ".xlsx", ".xls"]
        file_extension = os.path.splitext(file.filename)[1].lower()

        if file_extension not in allowed_extensions:
            create_notification(
                db=db,
                user_id=current_user.id,
                title="Dataset Upload Failed",
                message="Only CSV and Excel files are allowed"
            )
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only CSV and Excel files are allowed. Use.csv or.xlsx"
            )

        # 2. SAVE FILE with unique name
        os.makedirs(UPLOAD_DIR, exist_ok=True)
        unique_filename = f"{uuid.uuid4()}_{file.filename}"
        file_path = os.path.join(UPLOAD_DIR, unique_filename)
        absolute_path = os.path.abspath(file_path)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # 3. CLEAN DATASET + STATS CALCULATE
        try:
            df = clean_dataset(absolute_path)
            processing_result = auto_process_dataset(absolute_path)

            # STATS CALCULATE CHESI DB LO SAVE
            total_revenue = float(df['sales'].sum()) if 'sales' in df.columns else 0
            avg_sales = float(df['sales'].mean()) if 'sales' in df.columns else 0

        except Exception as e:
            if os.path.exists(file_path):
                os.remove(file_path)
            raise HTTPException(
                status_code=500,
                detail=f"Error processing file: {str(e)}"
            )

        # 4. SAVE DATASET METADATA WITH STATS
        dataset = Dataset(
            filename=file.filename,
            file_path=absolute_path,
            uploaded_by=current_user.id,
            rows=len(df),
            total_revenue=total_revenue,
            avg_sales=avg_sales
        )

        db.add(dataset)
        db.commit()
        db.refresh(dataset)

        # 5. SUCCESS NOTIFICATION
        create_notification(
            db=db,
            user_id=current_user.id,
            title="Dataset Uploaded Successfully",
            message=f"{file.filename} uploaded with {len(df)} rows"
        )

        return {
            "message": "Dataset uploaded successfully",
            "filename": file.filename,
            "rows": len(df),
            "columns": len(df.columns),
            "total_revenue": total_revenue,
            "avg_sales": avg_sales,
            "workflow": processing_result,
            "dataset_id": dataset.id
        }

    except HTTPException:
        raise
    except Exception as e:
        create_notification(
            db=db,
            user_id=current_user.id,
            title="Dataset Upload Failed",
            message=str(e)
        )
        raise HTTPException(
            status_code=500,
            detail=f"Upload failed: {str(e)}"
        )

@router.get("/list")
def get_paginated_datasets(
    page: int = 1,
    limit: int = 5,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if page <= 0:
        raise HTTPException(status_code=400, detail="Page must be greater than 0")
    if limit <= 0:
        raise HTTPException(status_code=400, detail="Limit must be greater than 0")

    skip = (page - 1) * limit

    datasets = db.query(Dataset).filter(
        Dataset.uploaded_by == current_user.id
    ).order_by(
        Dataset.id.desc()
    ).offset(skip).limit(limit).all()

    total_datasets = db.query(Dataset).filter(
        Dataset.uploaded_by == current_user.id
    ).count()

    results = []
    for item in datasets:
        results.append({
            "id": item.id,
            "filename": item.filename,
            "file_path": item.file_path,
            "rows": item.rows,
            "total_revenue": item.total_revenue,
            "avg_sales": item.avg_sales,
            "created_at": item.created_at
        })

    return {
        "page": page,
        "limit": limit,
        "total_datasets": total_datasets,
        "datasets": results
    }

@router.get("/search")
def search_datasets(
    keyword: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    datasets = db.query(Dataset).filter(
        Dataset.uploaded_by == current_user.id,
        Dataset.filename.ilike(f"%{keyword}%")
    ).order_by(
        Dataset.id.desc()
    ).all()

    results = []
    for item in datasets:
        results.append({
            "id": item.id,
            "filename": item.filename,
            "file_path": item.file_path,
            "rows": item.rows,
            "total_revenue": item.total_revenue,
            "avg_sales": item.avg_sales,
            "created_at": item.created_at
        })

    return {
        "keyword": keyword,
        "total_results": len(results),
        "datasets": results
    }