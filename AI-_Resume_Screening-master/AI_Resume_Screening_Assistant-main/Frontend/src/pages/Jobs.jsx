import { useEffect, useState } from "react";

import MainLayout from "../layout/MainLayout";

import JobHeader from "../components/JobHeader";
import CreateJob from "../components/CreateJob";
import JobGrid from "../components/JobGrid";

import jobService from "../services/jobService";

export default function Jobs() {

  const [createJobOpen, setCreateJobOpen] =
    useState(false);

  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [createLoading, setCreateLoading] =
    useState(false);

  /*
  =====================================================
  Load Jobs
  =====================================================
  */

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = async () => {

    try {

        const data = await jobService.getJobs();

        console.log("Jobs API Response:", data);

        setJobs(data);

    } catch (error) {

        console.error("Jobs Error:", error);

    } finally {

        setLoading(false);

    }

    };

    /*
  =====================================================
  Create Job
  =====================================================
  */

  const handleCreateJob = async (
    jobData
  ) => {

    try {

      setCreateLoading(true);

      await jobService.createJob(
        jobData
      );

      alert(
        "✅ Job created successfully!"
      );

      await fetchJobs();

      setCreateJobOpen(false);

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Failed to create job."
      );

    } finally {

      setCreateLoading(false);

    }

  };

  /*
  =====================================================
  Delete Job
  =====================================================
  */

  const handleDelete = async (
    job
  ) => {

    const confirmDelete =
      window.confirm(
        `Delete "${job.title}"?`
      );

    if (!confirmDelete) return;

    try {

      await jobService.deleteJob(
        job.id
      );

      alert(
        "✅ Job deleted successfully!"
      );

      await fetchJobs();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Unable to delete job."
      );

    }

  };

    /*
  =====================================================
  View Job
  =====================================================
  */

  const handleView = async (
    job
  ) => {

    console.log(
      "View Job:",
      job
    );

    // Later:
    // Open Job Details Drawer
    // or Navigate to Job Details Page

  };

  /*
  =====================================================
  Edit Job
  =====================================================
  */

  const handleEdit = async (
    job
  ) => {

    console.log(
      "Edit Job:",
      job
    );

    // Later:
    // Open Edit Form
    // Prefill Job Data

  };

  return (

    <MainLayout>

      <div className="space-y-8">

                <JobHeader
          createJobOpen={createJobOpen}
          setCreateJobOpen={setCreateJobOpen}
        />

        {createJobOpen && (

          <CreateJob
            onCreateJob={handleCreateJob}
            loading={createLoading}
          />

        )}

        {loading ? (

          <div
            className="
              rounded-[28px]
              border
              border-[#EFE8F6]
              bg-[#FCFAFD]
              p-10
              text-center
            "
          >

            <h2
              className="
                text-xl
                font-semibold
                text-slate-600
              "
            >

              Loading Jobs...

            </h2>

          </div>

        ) : (

          <JobGrid
            jobs={jobs}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

        )}

      </div>

    </MainLayout>

  );

}