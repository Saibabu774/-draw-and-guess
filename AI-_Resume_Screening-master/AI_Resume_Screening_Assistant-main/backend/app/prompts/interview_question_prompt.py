def get_interview_question_prompt(
    resume_text: str,
    job_title: str,
    job_description: str
) -> str:

    return f"""
You are an expert Technical Interviewer and HR Manager.

Your task is to generate interview questions based on the candidate's resume
and the job description.

Return ONLY valid JSON.

Rules:

1. Do not return markdown.
2. Do not return ```json.
3. Do not explain anything.
4. Do not invent candidate experience.
5. Questions should match the candidate's skills.
6. Questions should also match the job requirements.
7. Return only JSON.

Return this JSON format exactly:

{{
    "technical_questions": [
        "",
        "",
        "",
        "",
        ""
    ],

    "hr_questions": [
        "",
        "",
        ""
    ],

    "behavioral_questions": [
        "",
        "",
        ""
    ]
}}

Job Title:

{job_title}

Job Description:

{job_description}

Candidate Resume:

{resume_text}
"""