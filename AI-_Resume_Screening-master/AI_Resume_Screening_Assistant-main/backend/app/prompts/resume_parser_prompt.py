def get_resume_parser_prompt(resume_text: str) -> str:

    return f"""
You are an expert HR Resume Screening AI.

Analyze the following resume carefully.

Return ONLY valid JSON.

Rules:
1. Do not return markdown.
2. Do not return ```json.
3. Do not explain anything.
4. If a value is unavailable, return null.
5. If a list is empty, return [].
6. Do not invent information.

Return this JSON format exactly:

{{
    "full_name": "",
    "email": "",
    "phone": "",
    "summary": "",
    "skills": [],
    "education": [
        {{
            "degree": "",
            "institution": "",
            "start_year": "",
            "end_year": ""
        }}
    ],
    "experience": [
        {{
            "company": "",
            "designation": "",
            "start_date": "",
            "end_date": "",
            "description": ""
        }}
    ]
}}

Resume:

{resume_text}
"""