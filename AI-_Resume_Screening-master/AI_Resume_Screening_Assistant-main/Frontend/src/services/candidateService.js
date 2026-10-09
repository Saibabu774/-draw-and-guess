import API from "./api";

const candidateService = {

  /*
  ============================================
  Upload Candidate
  ============================================
  */

  async uploadCandidate(formData) {

    const response = await API.post(

      "/candidates/upload",

      formData,

      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }

    );

    return response.data;

  },

  /*
  ============================================
  Get All Candidates
  ============================================
  */

  async getCandidates() {

    const response = await API.get(
      "/candidates"
    );

    return response.data;

  },



  /*
  ============================================
  Get Candidate By ID
  ============================================
  */

  async getCandidate(candidateId) {

    const response = await API.get(
      `/candidates/${candidateId}`
    );

    return response.data;

  },

  /*
  ============================================
  Delete Candidate
  ============================================
  */

  async deleteCandidate(candidateId) {

    const response = await API.delete(
      `/candidates/${candidateId}`
    );

    return response.data;

  }

  };

export default candidateService;