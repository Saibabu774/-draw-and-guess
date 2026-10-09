def get_candidate_summary_prompt(
    resume_text: str
) -> str:

    return f"""
You are an expert HR Recruiter.

Analyze the following candidate resume.

Return ONLY valid JSON.

Rules:

1. Do not return markdown.
2. Do not return ```json.
3. Do not explain anything.
4. Do not invent information.
5. Return only JSON.

Return this format exactly:

{{
    "candidate_overview": "",

    "skill_assessment": "",

    "experience_summary": "",

    "hiring_recommendation": ""
}}

Resume:

{resume_text}
"""