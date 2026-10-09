from fastapi import HTTPException
from fastapi import status

from sqlalchemy.orm import Session

from app.models.job import Job
from app.models.job_skill import JobSkill
from app.models.skill import Skill

from app.schemas.job import (
    JobCreate,
    JobDeleteResponse,
    JobListResponse,
    JobResponse,
    JobUpdate
)


class JobService:

    def __init__(self, db: Session):

        self.db = db


    def _save_skills(
        self,
        job: Job,
        skills: list[str]
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
                self.db.query(JobSkill)
                .filter(
                    JobSkill.job_id == job.id,
                    JobSkill.skill_id == skill.id
                )
                .first()
            )

            if existing_mapping is None:

                job_skill = JobSkill(
                    job_id=job.id,
                    skill_id=skill.id
                )

                self.db.add(job_skill)

        self.db.commit()

    def create_job(
        self,
        job_data: JobCreate
    ) -> JobResponse:

        existing_job = (
            self.db.query(Job)
            .filter(
                Job.title == job_data.title,
                Job.is_deleted == False
            )
            .first()
        )

        if existing_job:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Job title already exists."
            )

        new_job = Job(
            title=job_data.title,
            experience_required=job_data.experience_required,
            location=job_data.location,
            employment_type=job_data.employment_type,
            description=job_data.description
        )

        self.db.add(new_job)
        self.db.commit()
        self.db.refresh(new_job)

        self._save_skills(
            new_job,
            job_data.skills
        )

        return JobResponse(
            id=new_job.id,
            title=new_job.title,
            experience_required=new_job.experience_required,
            location=new_job.location,
            employment_type=new_job.employment_type,
            description=new_job.description,
            skills=job_data.skills
        )
    
    def get_all_jobs(
        self
    ) -> list[JobListResponse]:

        jobs = (
            self.db.query(Job)
            .filter(
                Job.is_deleted == False
            )
            .order_by(
                Job.created_at.desc()
            )
            .all()
        )

        job_list = []

        for job in jobs:

            job_list.append(
                JobListResponse(
                    id=job.id,
                    title=job.title,
                    location=job.location,
                    employment_type=job.employment_type
                )
            )

        return job_list
    
    def get_job(
        self,
        job_id: int
    ) -> JobResponse:

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

        skills = [
            job_skill.skill.name
            for job_skill in job.job_skills
        ]

        return JobResponse(
            id=job.id,
            title=job.title,
            experience_required=job.experience_required,
            location=job.location,
            employment_type=job.employment_type,
            description=job.description,
            skills=skills
        )
    
    def update_job(
        self,
        job_id: int,
        job_data: JobUpdate
    ) -> JobResponse:

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

        if job_data.title is not None:
            job.title = job_data.title

        if job_data.experience_required is not None:
            job.experience_required = job_data.experience_required

        if job_data.location is not None:
            job.location = job_data.location

        if job_data.employment_type is not None:
            job.employment_type = job_data.employment_type

        if job_data.description is not None:
            job.description = job_data.description

        self.db.commit()
        self.db.refresh(job)

        if job_data.skills is not None:

            (
                self.db.query(JobSkill)
                .filter(
                    JobSkill.job_id == job.id
                )
                .delete()
            )

            self.db.commit()

            self._save_skills(
                job,
                job_data.skills
            )

        skills = [
            job_skill.skill.name
            for job_skill in job.job_skills
        ]

        return JobResponse(
            id=job.id,
            title=job.title,
            experience_required=job.experience_required,
            location=job.location,
            employment_type=job.employment_type,
            description=job.description,
            skills=skills
        )

    def delete_job(
        self,
        job_id: int
    ) -> JobDeleteResponse:

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

        job.is_deleted = True

        self.db.commit()

        return JobDeleteResponse(
            message="Job deleted successfully."
        )