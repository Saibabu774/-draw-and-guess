import { useEffect, useState } from "react";

import {
  BrainCircuit,
} from "lucide-react";

import MainLayout from "../layout/MainLayout";
import CandidateInfoCard from "../components/CandidateInfoCard";

import aiService from "../services/aiService";
import candidateService from "../services/candidateService";
import jobService from "../services/jobService";

/*
=======================================
Interview Questions
=======================================
*/

export default function InterviewQuestions() {

  /*
  =======================================
  State
  =======================================
  */

  const [loading, setLoading] =
    useState(false);

  const [candidateId, setCandidateId] =
    useState("");

  const [jobId, setJobId] =
    useState("");

  const [candidate, setCandidate] =
    useState(null);

  const [questions, setQuestions] =
    useState(null);

  const [candidates, setCandidates] =
    useState([]);

  const [jobs, setJobs] =
    useState([]);

  /*
  =======================================
  Load Data
  =======================================
  */

  useEffect(() => {

    loadCandidates();

    loadJobs();

  }, []);

  const loadCandidates =
    async () => {

      try {

        const data =
          await candidateService.getCandidates();

        setCandidates(data);

      } catch (error) {

        console.error(error);

      }

    };

  const loadJobs =
    async () => {

      try {

        const data =
          await jobService.getJobs();

        setJobs(data);

      } catch (error) {

        console.error(error);

      }

    };

  /*
  =======================================
  Generate Questions
  =======================================
  */

  const handleGenerate =
    async (e) => {

      e.preventDefault();

      if (!candidateId || !jobId) {

        return alert(
          "Please select both candidate and job."
        );

      }

      try {

        setLoading(true);

        const [
          interviewResult,
          candidateResult,
        ] = await Promise.all([

          aiService.generateInterviewQuestions(
            Number(candidateId),
            Number(jobId)
          ),

          candidateService.getCandidate(
            Number(candidateId)
          ),

        ]);

        setQuestions(
          interviewResult
        );

        setCandidate(
          candidateResult
        );

      } catch (error) {

        console.error(error);

        alert(
          error.response?.data?.detail ||
          "Unable to generate interview questions."
        );

      } finally {

        setLoading(false);

      }

    };

  return (

    <MainLayout>

      <div className="space-y-8">

        {/* ====================================== */}
        {/* Header */}
        {/* ====================================== */}

        <section
          className="
            rounded-[28px]
            border
            border-[#EFE8F6]
            bg-white
            p-8
            shadow-[0_10px_30px_rgba(120,80,180,0.06)]
          "
        >

          <div className="flex items-center gap-5">

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
                to-fuchsia-500
              "
            >

              <BrainCircuit
                size={28}
                className="text-white"
              />

            </div>

            <div>

              <h1
                className="
                  text-3xl
                  font-bold
                  text-slate-900
                "
              >
                Interview Questions
              </h1>

              <p
                className="
                  mt-2
                  text-sm
                  text-slate-500
                "
              >
                Generate AI interview questions
                based on the selected candidate
                and job.
              </p>

            </div>

          </div>

        </section>

        {/* ====================================== */}
        {/* Form */}
        {/* ====================================== */}

        <section
          className="
            rounded-[28px]
            border
            border-[#EFE8F6]
            bg-white
            shadow-[0_10px_30px_rgba(120,80,180,0.06)]
          "
        >

          <form
            onSubmit={handleGenerate}
            className="
              grid
              gap-6
              p-6
              md:grid-cols-3
            "
          >

            {/* Candidate */}

            <div>

              <label
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
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
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-[#EFE8F6]
                  px-4
                  outline-none
                  focus:border-violet-400
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
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-slate-700
                "
              >
                Job
              </label>

              <select
                value={jobId}
                onChange={(e) =>
                  setJobId(
                    e.target.value
                  )
                }
                className="
                  h-12
                  w-full
                  rounded-xl
                  border
                  border-[#EFE8F6]
                  px-4
                  outline-none
                  focus:border-violet-400
                "
              >

                <option value="">
                  Select Job
                </option>

                {jobs.map(
                  (job) => (

                    <option
                      key={job.id}
                      value={job.id}
                    >
                      {job.title}
                    </option>

                  )
                )}

              </select>

            </div>

            {/* Button */}

            <div className="flex items-end">

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-violet-600
                  to-pink-500
                  px-6
                  py-3
                  font-medium
                  text-white
                  transition
                  hover:opacity-95
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >

                {loading
                  ? "Generating..."
                  : "Generate Questions"}

              </button>

            </div>

          </form>

        </section>

                {/* ====================================== */}
        {/* Results */}
        {/* ====================================== */}

        {questions && candidate ? (

          <div
            className="
              grid
              gap-6
              lg:grid-cols-3
            "
          >

            {/* ====================================== */}
            {/* Candidate Info */}
            {/* ====================================== */}

            <CandidateInfoCard
              candidate={candidate}
            />

            {/* ====================================== */}
            {/* Questions */}
            {/* ====================================== */}

            <div
              className="
                space-y-6
                lg:col-span-2
              "
            >

              {/* ====================================== */}
              {/* Technical Questions */}
              {/* ====================================== */}

              <section
                className="
                  rounded-[24px]
                  border-2
                  border-violet-200
                  bg-violet-50/40
                  p-6
                "
              >

                <h2
                  className="
                    mb-5
                    text-xl
                    font-semibold
                    text-slate-900
                  "
                >
                  💻 Technical Questions
                </h2>

                <div className="space-y-4">

                  {questions.technical_questions.map(
                    (question, index) => (

                      <div
                        key={index}
                        className="
                          flex
                          gap-4
                          rounded-2xl
                          border
                          border-violet-100
                          bg-white
                          p-4
                        "
                      >

                        <div
                          className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-violet-600
                            text-sm
                            font-bold
                            text-white
                          "
                        >

                          {index + 1}

                        </div>

                        <p
                          className="
                            leading-7
                            text-slate-700
                          "
                        >
                          {question}
                        </p>

                      </div>

                    )
                  )}

                </div>

              </section>

              {/* ====================================== */}
              {/* HR Questions */}
              {/* ====================================== */}

              <section
                className="
                  rounded-[24px]
                  border-2
                  border-pink-200
                  bg-pink-50/40
                  p-6
                "
              >

                <h2
                  className="
                    mb-5
                    text-xl
                    font-semibold
                    text-slate-900
                  "
                >
                  👥 HR Questions
                </h2>

                <div className="space-y-4">

                  {questions.hr_questions.map(
                    (question, index) => (

                      <div
                        key={index}
                        className="
                          flex
                          gap-4
                          rounded-2xl
                          border
                          border-pink-100
                          bg-white
                          p-4
                        "
                      >

                        <div
                          className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-pink-500
                            text-sm
                            font-bold
                            text-white
                          "
                        >

                          {index + 1}

                        </div>

                        <p
                          className="
                            leading-7
                            text-slate-700
                          "
                        >
                          {question}
                        </p>

                      </div>

                    )
                  )}

                </div>

              </section>

              {/* ====================================== */}
              {/* Behavioral Questions */}
              {/* ====================================== */}

              <section
                className="
                  rounded-[24px]
                  border-2
                  border-indigo-200
                  bg-indigo-50/40
                  p-6
                "
              >

                <h2
                  className="
                    mb-5
                    text-xl
                    font-semibold
                    text-slate-900
                  "
                >
                  🤝 Behavioral Questions
                </h2>

                <div className="space-y-4">

                  {questions.behavioral_questions.map(
                    (question, index) => (

                      <div
                        key={index}
                        className="
                          flex
                          gap-4
                          rounded-2xl
                          border
                          border-indigo-100
                          bg-white
                          p-4
                        "
                      >

                        <div
                          className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-indigo-500
                            text-sm
                            font-bold
                            text-white
                          "
                        >

                          {index + 1}

                        </div>

                        <p
                          className="
                            leading-7
                            text-slate-700
                          "
                        >
                          {question}
                        </p>

                      </div>

                    )
                  )}

                </div>

              </section>

            </div>

          </div>

        ) : (

          <section
            className="
              rounded-[24px]
              border
              border-[#EFE8F6]
              bg-white
              p-12
              text-center
              shadow-[0_10px_30px_rgba(120,80,180,0.06)]
            "
          >

            <BrainCircuit
              size={44}
              className="
                mx-auto
                text-violet-500
              "
            />

            <h2
              className="
                mt-5
                text-2xl
                font-semibold
                text-slate-900
              "
            >
              AI Interview Questions
            </h2>

            <p
              className="
                mt-3
                text-slate-500
              "
            >
              Select a candidate and job to
              generate AI-powered interview
              questions.
            </p>

          </section>

        )}

      </div>

    </MainLayout>

  );

}