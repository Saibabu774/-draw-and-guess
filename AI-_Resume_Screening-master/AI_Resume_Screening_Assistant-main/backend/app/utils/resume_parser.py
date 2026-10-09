import os

import docx
import fitz


class ResumeParser:

    @staticmethod
    def extract_text(file_path: str) -> str:

        extension = os.path.splitext(file_path)[1].lower()

        if extension == ".pdf":
            return ResumeParser._extract_pdf(file_path)

        if extension == ".docx":
            return ResumeParser._extract_docx(file_path)

        raise ValueError("Unsupported file format.")

    @staticmethod
    def _extract_pdf(file_path: str) -> str:

        text = ""

        document = fitz.open(file_path)

        for page in document:
            text += page.get_text()

        document.close()

        return text.strip()

    @staticmethod
    def _extract_docx(file_path: str) -> str:

        text = ""

        document = docx.Document(file_path)

        for paragraph in document.paragraphs:
            text += paragraph.text + "\n"

        return text.strip()