import API from "./api";

/*
====================================================
Job Service
====================================================
*/

const jobService = {

  /*
  ====================================================
  Create Job
  ====================================================
  */

  async createJob(jobData) {

    const response = await API.post(
      "/jobs",
      jobData
    );

    return response.data;

  },

  /*
  ====================================================
  Get All Jobs
  ====================================================
  */

  async getJobs() {

    const response = await API.get(
      "/jobs"
    );

    return response.data;

  },
    /*
  ====================================================
  Get Job By ID
  ====================================================
  */

  async getJob(jobId) {

    const response = await API.get(
      `/jobs/${jobId}`
    );

    return response.data;

  },

  /*
  ====================================================
  Update Job
  ====================================================
  */

  async updateJob(
    jobId,
    jobData
  ) {

    const response = await API.put(
      `/jobs/${jobId}`,
      jobData
    );

    return response.data;

  },
    /*
  ====================================================
  Delete Job
  ====================================================
  */

  async deleteJob(jobId) {

    const response = await API.delete(
      `/jobs/${jobId}`
    );

    return response.data;

  },

  };

export default jobService;