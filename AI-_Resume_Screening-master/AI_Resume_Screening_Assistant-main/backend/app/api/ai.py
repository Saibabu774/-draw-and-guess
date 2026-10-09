from fastapi import APIRouter
router = APIRouter()

@router.post("/screen")
def screen_resume():
    return {"result": "AI screening"}