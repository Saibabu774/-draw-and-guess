import { useEffect, useState } from "react";

import {
  User,
  BriefcaseBusiness,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

import candidateService from "../services/candidateService";
import jobService from "../services/jobService";

/*
=======================================
Resume Matching Form
=======================================
*/

export default function MatchForm({
  onAnalyze,
  loading,
}) {
  const [candidates, setCandidates] =
    useState([]);

  const [jobs, setJobs] =
    useState([]);

  const [candidateId, setCandidateId] =
    useState("");

  const [jobId, setJobId] =
    useState("");

  /*
  =======================================
  Load Candidates & Jobs
  =======================================
  */

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [
        candidateData,
        jobData,
      ] = await Promise.all([
        candidateService.getCandidates(),
        jobService.getJobs(),
      ]);

      setCandidates(candidateData);
      setJobs(jobData);
    } catch (error) {
      console.error(error);

      alert(
        "Unable to load candidates or jobs."
      );
    }
  };

  /*
  =======================================
  Submit
  =======================================
  */

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!candidateId) {
      return alert(
        "Please select a candidate."
      );
    }

    if (!jobId) {
      return alert(
        "Please select a job."
      );
    }

    onAnalyze({
      candidate_id: Number(candidateId),
      job_id: Number(jobId),
    });
  };

  return (
    <section
      className="
        rounded-[30px]
        border
        border-[#EFE8F6]
        bg-[#FCFAFD]
        shadow-[0_10px_30px_rgba(120,80,180,0.06)]
        overflow-hidden
      "
    >
      {/* ====================================== */}
      {/* Header */}
      {/* ====================================== */}

      <div
        className="
          border-b
          border-[#EFE8F6]
          bg-gradient-to-r
          from-violet-50
          via-fuchsia-50
          to-pink-50
          px-8
          py-6
        "
      >
        <div className="flex items-center gap-4">
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-violet-600
              via-fuchsia-500
              to-pink-500
            "
          >
            <BrainCircuit
              size={28}
              className="text-white"
            />
          </div>

          <div>
            <h2
              className="
                text-2xl
                font-bold
                text-slate-900
              "
            >
              AI Resume Analysis
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >
              Select a candidate and a job
              position to begin AI-powered
              resume matching.
            </p>
          </div>
        </div>
      </div>

      {/* ====================================== */}
      {/* Form */}
      {/* ====================================== */}

      <form
        onSubmit={handleSubmit}
        className="p-8"
      >
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Candidate */}

          <div>

            <label
              className="
                mb-3
                flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-slate-700
              "
            >
              <User
                size={16}
                className="text-violet-600"
              />

              Candidate
            </label>

            <select
              value={candidateId}
              onChange={(e) =>
                setCandidateId(
                  e.target.value
                )
              }
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-[#EFE8F6]
                bg-white
                px-5
                text-slate-700
                outline-none
                transition-all
                duration-300
                focus:border-fuchsia-300
                focus:ring-4
                focus:ring-fuchsia-100
              "
            >
              <option value="">
                Select Candidate
              </option>

              {candidates.map(
                (candidate) => (
                  <option
                    key={candidate.id}
                    value={candidate.id}
                  >
                    {candidate.full_name}
                  </option>
                )
              )}
            </select>

          </div>

          {/* Job */}

          <div>

            <label
              className="
                mb-3
                flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-slate-700
              "
            >
              <BriefcaseBusiness
                size={16}
                className="text-violet-600"
              />

              Job Position
            </label>

            <select
              value={jobId}
              onChange={(e) =>
                setJobId(
                  e.target.value
                )
              }
              className="
                h-14
                w-full
                rounded-2xl
                border
                border-[#EFE8F6]
                bg-white
                px-5
                text-slate-700
                outline-none
                transition-all
                duration-300
                focus:border-fuchsia-300
                focus:ring-4
                focus:ring-fuchsia-100
              "
            >
              <option value="">
                Select Job
              </option>

              {jobs.map((job) => (
                <option
                  key={job.id}
                  value={job.id}
                >
                  {job.title}
                </option>
              ))}
            </select>

          </div>

        </div>

        {/* ====================================== */}
        {/* Button */}
        {/* ====================================== */}

        <div className="mt-8 flex justify-end">

          <button
            type="submit"
            disabled={loading}
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-violet-600
              via-fuchsia-500
              to-pink-500
              px-8
              py-4
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-xl
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {loading ? (
              <>
                <div
                  className="
                    h-5
                    w-5
                    animate-spin
                    rounded-full
                    border-2
                    border-white
                    border-t-transparent
                  "
                />

                Analyzing Resume...
              </>
            ) : (
              <>
                <Sparkles
                  size={20}
                />

                Analyze Resume
              </>
            )}
          </button>

        </div>

      </form>
    </section>
  );
}