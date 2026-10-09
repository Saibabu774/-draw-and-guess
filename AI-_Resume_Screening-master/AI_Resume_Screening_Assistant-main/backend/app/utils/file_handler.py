import os
import shutil
import uuid

from fastapi import HTTPException, UploadFile, status


UPLOAD_DIRECTORY = "uploads"

ALLOWED_EXTENSIONS = {
    ".pdf",
    ".docx"
}


os.makedirs(
    UPLOAD_DIRECTORY,
    exist_ok=True
)


def save_resume(file: UploadFile) -> str:

    file_extension = os.path.splitext(file.filename)[1].lower()

    if file_extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF and DOCX files are allowed."
        )

    unique_filename = f"{uuid.uuid4()}{file_extension}"

    file_path = os.path.join(
        UPLOAD_DIRECTORY,
        unique_filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    return file_path