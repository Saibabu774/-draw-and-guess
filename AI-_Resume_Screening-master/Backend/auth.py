from fastapi import APIRouter
router = APIRouter()

@router.get("/test")
def test():
    return {"message": "Auth API working"}

@router.post("/login")
def login():
    return {"message": "Login API"}