from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.dataset import Dataset
from sqlalchemy import func

router = APIRouter()  # ✅ prefix ikkada pettaka

@router.get("/summary")
async def get_summary(db: Session = Depends(get_db)):
    total_rows = db.query(Dataset).count()
    return {"total_rows": total_rows, "message": "Summary OK"}

@router.get("/monthly-sales")
async def get_monthly_sales(db: Session = Depends(get_db)):
    # Sample data - actual CSV columns batti change chei
    data = [
        {"month": "Jan", "sales": 1200},
        {"month": "Feb", "sales": 1900},
        {"month": "Mar", "sales": 3000},
        {"month": "Apr", "sales": 2500},
        {"month": "May", "sales": 4200},
        {"month": "Jun", "sales": 3800}
    ]
    return data

@router.get("/category-sales")
async def get_category_sales(db: Session = Depends(get_db)):
    # Sample data - actual DB query petti
    data = [
        {"category": "Electronics", "sales": 8000},
        {"category": "Clothing", "sales": 6500},
        {"category": "Food", "sales": 4200},
        {"category": "Books", "sales": 2800}
    ]
    return data