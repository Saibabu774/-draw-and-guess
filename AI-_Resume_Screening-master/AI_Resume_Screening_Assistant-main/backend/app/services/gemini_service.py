import json
import os

from dotenv import load_dotenv
from google import genai


from pathlib import Path
from dotenv import load_dotenv

load_dotenv(
    dotenv_path=Path(__file__).resolve().parents[2] / ".env",
    override=True
)


class GeminiService:

    def __init__(self):

        api_key = os.getenv("GEMINI_API_KEY")


        if not api_key:
            raise ValueError(
                "GEMINI_API_KEY not found in .env file."
            )

        self.client = genai.Client(
            api_key=api_key
        )

        self.model = "gemini-2.5-flash"

    def generate_text(
        self,
        prompt: str
    ) -> str:

        response = self.client.models.generate_content(
            model=self.model,
            contents=prompt
        )

        return response.text

    def generate_json(
        self,
        prompt: str
    ) -> dict:

        response = self.generate_text(
            prompt
        )

        response = response.strip()

        if response.startswith("```json"):
            response = response.replace(
                "```json",
                ""
            )

        if response.endswith("```"):
            response = response[:-3]

        response = response.strip()

        try:

            return json.loads(response)

        except json.JSONDecodeError:

            raise ValueError(
                "Gemini returned invalid JSON."
            )