from fastapi import HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.models.candidate import Candidate
from app.models.user import User
from app.schemas.candidate import (
    CandidateListResponse,
    CandidateResponse
)
from app.utils.file_handler import save_resume
from app.utils.resume_parser import ResumeParser


class CandidateService:

    @staticmethod
    def upload_candidate(
        full_name: str,
        email: str,
        phone: str | None,
        file: UploadFile,
        current_user: User,
        db: Session
    ) -> CandidateResponse:

        existing_candidate = (
            db.query(Candidate)
            .filter(
                Candidate.email == email,
                Candidate.is_deleted == False
            )
            .first()
        )

        if existing_candidate:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Candidate already exists."
            )

        resume_path = save_resume(file)

        resume_text = ResumeParser.extract_text(resume_path)

        new_candidate = Candidate(
            full_name=full_name,
            email=email,
            phone=phone,
            resume_file=resume_path,
            resume_text=resume_text,
            uploaded_by=current_user.id
        )

        db.add(new_candidate)
        db.commit()
        db.refresh(new_candidate)

        return CandidateResponse(
            id=new_candidate.id,
            full_name=new_candidate.full_name,
            email=new_candidate.email,
            phone=new_candidate.phone,
            resume_file=new_candidate.resume_file,
            created_at=new_candidate.created_at.date()
        )

    @staticmethod
    def get_all_candidates(
        db: Session
    ) -> list[CandidateListResponse]:

        candidates = (
            db.query(Candidate)
            .filter(
                Candidate.is_deleted == False
            )
            .order_by(Candidate.created_at.desc())
            .all()
        )

        return [
            CandidateListResponse(
                id=candidate.id,
                full_name=candidate.full_name,
                email=candidate.email
            )
            for candidate in candidates
        ]

    @staticmethod
    def get_candidate(
        candidate_id: int,
        db: Session
    ) -> CandidateResponse:

        candidate = (
            db.query(Candidate)
            .filter(
                Candidate.id == candidate_id,
                Candidate.is_deleted == False
            )
            .first()
        )

        if candidate is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Candidate not found."
            )

        return CandidateResponse(
            id=candidate.id,
            full_name=candidate.full_name,
            email=candidate.email,
            phone=candidate.phone,
            resume_file=candidate.resume_file,
            created_at=candidate.created_at.date(),
            resume_text=candidate.resume_text
        )

    @staticmethod
    def delete_candidate(
        candidate_id: int,
        db: Session
    ) -> dict:

        candidate = (
            db.query(Candidate)
            .filter(
                Candidate.id == candidate_id,
                Candidate.is_deleted == False
            )
            .first()
        )

        if candidate is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Candidate not found."
            )

        candidate.is_deleted = True

        db.commit()

        return {
            "message": "Candidate deleted successfully."
        }