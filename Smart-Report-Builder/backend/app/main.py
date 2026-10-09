from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.users import router as users_router
from app.api.report_templates import router as templates_router

app = FastAPI(
    title="Smart Report Builder & Analytics Platform",
    description=(
        "A full-stack platform for creating, managing, "
        "executing, scheduling, sharing and exporting reports."
    ),
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(templates_router)


@app.get("/", tags=["Health"])
def root():
    return {
        "application": "Smart Report Builder",
        "status": "running",
        "version": "1.0.0",
    }


@app.get("/health", tags=["Health"])
def health():
    return {
        "status": "healthy",
    }