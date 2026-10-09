#  AI Resume Screening & Interview Assistant

An AI-powered recruitment platform that helps recruiters streamline the hiring process by automating resume screening, candidate evaluation, AI-generated summaries, interview question generation, and recruitment analytics.

The application is built using **React.js**, **FastAPI**, **MySQL**, **SQLAlchemy**, **JWT Authentication**, and **Google Gemini AI**.

---

#  Features

##  Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-Based Access

---

##  Dashboard

- Total Candidates
- Total Jobs
- Resume Evaluations
- Average Match Score
- Recent Activities
- Modern Analytics Dashboard

---

##  Candidate Management

- Upload Candidate Resume
- Drag & Drop Resume Upload
- View Candidate Details
- Delete Candidate
- Resume Storage
- Resume Text Extraction

---

##  Job Management

- Create Job
- View Jobs
- Delete Jobs
- Employment Type
- Location
- Job Description
- Required Skills

---

#  AI Integration

## Resume Matching

Compare candidate resumes with job descriptions using AI.

### Features

- AI Match Percentage
- Matching Skills
- Missing Skills
- Strength Analysis
- AI Recommendation

---

## Candidate Summary

Generate an AI summary of the candidate including:

- Professional Summary
- Experience Overview
- Technical Skills
- Key Highlights

---

## Interview Questions

Generate AI interview questions categorized into:

- Technical Questions
- HR Questions
- Behavioral Questions

---

## Evaluation History

Maintain the history of all AI resume evaluations including:

- Candidate Name
- Job Title
- Match Score
- Matching Skills
- Missing Skills
- Strengths
- Weaknesses
- Recommendation

---

#  Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router DOM
- Lucide React

---

## Backend

- FastAPI
- SQLAlchemy
- MySQL
- Pydantic
- JWT Authentication
- Python

---

## AI

- Google Gemini API

---

## Database

- MySQL

---

# Project Structure

```
AI_Resume_Screening_Assistant/

│

├── Backend/

│   ├── app/

│   │   ├── core/

│   │   ├── database/

│   │   ├── models/

│   │   ├── routers/

│   │   ├── schemas/

│   │   ├── services/

│   │   ├── prompts/

│   │   ├── utils/

│   │   └── main.py

│

├── Frontend/

│   ├── src/

│   │   ├── components/

│   │   ├── contexts/

│   │   ├── layout/

│   │   ├── pages/

│   │   ├── services/

│   │   ├── routes/

│   │   └── App.jsx

│

└── README.md
```

---

#  Installation



## Backend Setup

```bash
cd Backend
```

Create Virtual Environment

```bash
python -m venv venv
```

Activate Environment

### Windows

```bash
venv\Scripts\activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

Create a `.env` file.

```

Run Backend

```bash
uvicorn app.main:app --reload
```

Backend URL

```
http://localhost:8000
```

Swagger

```
http://localhost:8000/docs
```

---

#  Frontend Setup

Navigate to frontend

```bash
cd Frontend
```

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

#  Authentication Flow

```
Register

↓

Login

↓

JWT Token

↓

Protected Routes

↓

Dashboard
```

---

#  AI Workflow

```
Upload Resume

↓

Resume Text Extraction

↓

Create Job

↓

Resume Matching

↓

Candidate Summary

↓

Interview Questions

↓

Evaluation History
```

---

#  Application Modules

- Login
- Register
- Dashboard
- Candidate Management
- Job Management
- Resume Matching
- Candidate Summary
- Interview Questions
- Evaluation History

---

#  UI Features

- Modern HR Dashboard
- Responsive Design
- Lavender & Violet Theme
- Reusable Components
- Glassmorphism Login & Register
- Gradient Cards
- Professional Layout
- Mobile Friendly

---

#  Security

- JWT Authentication
- Password Hashing
- Protected APIs
- Secure File Upload
- Environment Variables

---

