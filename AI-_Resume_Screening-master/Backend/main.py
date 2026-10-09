from fastapi import FastAPI, APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()  # 1. mundhu app create chey

# 2. CORS add chey
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Router create chey
router = APIRouter(prefix="/auth")

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    if form_data.username == "test@test.com" and form_data.password == "123":
        return {"access_token": "fake-token-123", "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid email or password")

@router.get("/me")
def get_me():
    return {"name": "Ravali Sai Babu", "email": "test@test.com"}

# 4. Last lo router include chey
app.include_router(router)

@app.get("/")
def home():
    return {"message": "Backend running"}