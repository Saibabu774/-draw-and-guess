import API from "./api";

/*
====================================================
AI Service
====================================================
*/

const aiService = {

  /*
  ====================================================
  Resume Matching
  POST /ai/match
  ====================================================
  */

  async matchResume(candidateId, jobId) {

    const response = await API.post(
      "/ai/match",
      {
        candidate_id: candidateId,
        job_id: jobId,
      }
    );

    return response.data;

  },

  /*
  ====================================================
  Candidate Summary
  POST /ai/summary
  ====================================================
  */

  async generateSummary(candidateId) {

    const response = await API.post(
      "/ai/summary",
      {
        candidate_id: candidateId,
      }
    );

    return response.data;

  },

  /*
  ====================================================
  Interview Questions
  POST /ai/questions
  ====================================================
  */

  async generateInterviewQuestions(
    candidateId,
    jobId
  ) {

    const response = await API.post(
      "/ai/questions",
      {
        candidate_id: candidateId,
        job_id: jobId,
      }
    );

    return response.data;

  },

  /*
  ====================================================
  Evaluation History
  GET /history
  ====================================================
  */

  async getHistory() {

    const response = await API.get(
      "/history"
    );

    return response.data;

  },

};

export default aiService;