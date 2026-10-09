import json
from fastapi import HTTPException
from fastapi import status

from sqlalchemy.orm import Session

from app.models.candidate import Candidate
from app.models.candidate_education import CandidateEducation
from app.models.candidate_experience import CandidateExperience
from app.models.candidate_skill import CandidateSkill
from app.models.skill import Skill
from app.models.job import Job
from app.models.resume_analysis import ResumeAnalysis

from app.prompts.resume_parser_prompt import get_resume_parser_prompt
from app.prompts.resume_match_prompt import get_resume_match_prompt
from app.services.gemini_service import GeminiService
from app.schemas.ai import MatchResponse


class AIService:

    def __init__(self, db: Session):

        self.db = db

        self.gemini = GeminiService()

    def parse_resume(
        self,
        candidate_id: int
    ) -> dict:

        candidate = (
            self.db.query(Candidate)
            .filter(
                Candidate.id == candidate_id,
                Candidate.is_deleted == False
            )
            .first()
        )

        if candidate is None:
            raise Exception(
                "Candidate not found."
            )

        if not candidate.resume_text:
            raise Exception(
                "Resume text not found."
            )

        prompt = get_resume_parser_prompt(
            candidate.resume_text
        )

        ai_response = self.gemini.generate_json(
            prompt
        )

        self._save_skills(
            candidate,
            ai_response.get("skills", [])
        )

        self._save_education(
            candidate,
            ai_response.get("education", [])
        )

        self._save_experience(
            candidate,
            ai_response.get("experience", [])
        )

        return ai_response
    
    def _save_skills(
        self,
        candidate: Candidate,
        skills: list
    ) -> None:

        for skill_name in skills:

            skill_name = skill_name.strip()

            if not skill_name:
                continue

            skill = (
                self.db.query(Skill)
                .filter(
                    Skill.name.ilike(skill_name)
                )
                .first()
            )

            if skill is None:

                skill = Skill(
                    name=skill_name
                )

                self.db.add(skill)
                self.db.commit()
                self.db.refresh(skill)

            existing_mapping = (
                self.db.query(CandidateSkill)
                .filter(
                    CandidateSkill.candidate_id == candidate.id,
                    CandidateSkill.skill_id == skill.id
                )
                .first()
            )

            if existing_mapping is None:

                candidate_skill = CandidateSkill(
                    candidate_id=candidate.id,
                    skill_id=skill.id
                )

                self.db.add(candidate_skill)

        self.db.commit()

    def _save_education(
        self,
        candidate: Candidate,
        educations: list
    ) -> None:

        for education in educations:

            degree = education.get("degree")

            if not degree:
                continue

            candidate_education = CandidateEducation(
                candidate_id=candidate.id,
                degree=degree,
                institution=education.get("institution"),
                field_of_study=education.get("field_of_study"),
                start_year=int(education["start_year"]) if education.get("start_year") else None,
                end_year=int(education["end_year"]) if education.get("end_year") else None,
                grade=education.get("grade")
            )

            self.db.add(candidate_education)

        self.db.commit()

    def _save_experience(
        self,
        candidate: Candidate,
        experiences: list
    ) -> None:

        for experience in experiences:

            company_name = experience.get("company")

            designation = experience.get("designation")

            if not company_name or not designation:
                continue

            end_date = experience.get("end_date")

            currently_working = False

            if end_date:

                if end_date.lower() in [
                    "present",
                    "current",
                    "currently",
                    "ongoing"
                ]:
                    currently_working = True

            candidate_experience = CandidateExperience(
                candidate_id=candidate.id,
                company_name=company_name,
                designation=designation,
                employment_type=experience.get("employment_type"),
                start_date=experience.get("start_date"),
                end_date=end_date,
                currently_working=currently_working,
                description=experience.get("description")
            )

            self.db.add(candidate_experience)

        self.db.commit()

    def match_candidate(
        self,
        candidate_id: int,
        job_id: int
    ) -> dict:

        candidate = (
            self.db.query(Candidate)
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

        job = (
            self.db.query(Job)
            .filter(
                Job.id == job_id,
                Job.is_deleted == False
            )
            .first()
        )

        if job is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Job not found."
            )

        prompt = get_resume_match_prompt(
            resume_text=candidate.resume_text,
            job_title=job.title,
            job_description=job.description
        )

        ai_response = self.gemini.generate_json(
            prompt
        )

        analysis = ResumeAnalysis(
            candidate_id=candidate.id,
            job_id=job.id,
            match_score=ai_response.get("match_score", 0),
            strengths="\n".join(
                ai_response.get("strengths", [])
            ),
            weaknesses="\n".join(
                ai_response.get("weaknesses", [])
            ),
            matching_skills="\n".join(
                ai_response.get("matching_skills", [])
            ),
            missing_skills="\n".join(
                ai_response.get("missing_skills", [])
            ),
            recommendation=ai_response.get(
                "recommendation",
                ""
            )
        )

        self.db.add(analysis)

        self.db.commit()

        return MatchResponse(
            match_score=ai_response.get(
                "match_score",
                0
            ),
            matching_skills=ai_response.get(
                "matching_skills",
                []
            ),
            missing_skills=ai_response.get(
                "missing_skills",
                []
            ),
            strengths=ai_response.get(
                "strengths",
                []
            ),
            weaknesses=ai_response.get(
                "weaknesses",
                []
            ),
            recommendation=ai_response.get(
                "recommendation",
                ""
            )
        )