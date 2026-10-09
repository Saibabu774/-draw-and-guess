import { useEffect, useState } from "react";

import {
  BrainCircuit,
  User,
} from "lucide-react";

import MainLayout from "../layout/MainLayout";

import CandidateInfoCard from "../components/CandidateInfoCard";

import aiService from "../services/aiService";
import candidateService from "../services/candidateService";

/*
=======================================
Candidate Summary
=======================================
*/

export default function CandidateSummary() {

  /*
  =======================================
  State
  =======================================
  */

  const [loading, setLoading] =
    useState(false);

  const [candidateId, setCandidateId] =
    useState("");

  const [candidates, setCandidates] =
    useState([]);

  const [candidate, setCandidate] =
    useState(null);

  const [summary, setSummary] =
    useState(null);

  /*
  =======================================
  Load Candidates
  =======================================
  */

 useEffect(() => {
  loadCandidates();
 }, []);

  const loadCandidates = async () => {

    try {

      const data =
        await candidateService.getCandidates();

      setCandidates(data);

    } catch (error) {

      console.error(error);

    }

  };

  /*
  =======================================
  Generate Summary
  =======================================
  */

  const handleGenerate =
    async (e) => {

      e.preventDefault();

      if (!candidateId) {

        return alert(
          "Please select a candidate."
        );

      }

      try {

        setLoading(true);

        const [
          summaryResult,
          candidateResult,
        ] = await Promise.all([

          aiService.generateSummary(
            Number(candidateId)
          ),

          candidateService.getCandidate(
            Number(candidateId)
          ),

        ]);

        setSummary(
          summaryResult
        );

        setCandidate(
          candidateResult
        );

      } catch (error) {

        console.error(error);

        alert(
          error.response?.data?.detail ||
          "Unable to generate summary."
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
                Candidate Summary
              </h1>

              <p
                className="
                  mt-2
                  text-sm
                  text-slate-500
                "
              >
                Generate an AI-powered summary
                for the selected candidate.
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
            border-[#             bg-white
            shadow-[0_10px_30px_rgba(120,80,180,0.06)]
          "
        >

          <form
            onSubmit={handleGenerate}
            className="
              flex
              flex-col
              gap-6
              p-6
              md:flex-row
              md:items-end
            "
          >

            <div className="flex-1">

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

            <button
              type="submit"
              disabled={loading}
              className="
                rounded-xl
                bg-violet-600
                px-6
                py-3
                font-medium
                text-white
                transition
                hover:bg-violet-700
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >

              {loading
                ? "Generating..."
                : "Generate Summary"}

            </button>

          </form>

        </section>

        {/* ====================================== */}
        {/* Result */}
        {/* ====================================== */}

        {summary && candidate && (

          <>

            <div
              className="
                grid
                gap-6
                lg:grid-cols-3
              "
            >

              {/* Left */}

              <CandidateInfoCard
                candidate={candidate}
              />

              {/* Right */}

              <div
                className="
                  space-y-6
                  lg:col-span-2
                "
              >

                {/* Candidate Overview */}

                <section
                  className="
                    rounded-[24px]
                    border-2
                    border-violet-200
                    bg-violet-50/30
                    p-6
                  "
                >

                  <h2
                    className="
                      mb-4
                      text-xl
                      font-semibold
                      text-slate-900
                    "
                  >
                    Candidate Overview
                  </h2>

                  <p
                    className="
                      leading-8
                      text-slate-700
                    "
                  >
                    {summary.candidate_overview}
                  </p>

                </section>

                {/* Skill Assessment */}

                <section
                  className="
                    rounded-[24px]
                    border-2
                    border-pink-200
                    bg-pink-50/30
                    p-6
                  "
                >

                  <h2
                    className="
                      mb-4
                      text-xl
                      font-semibold
                      text-slate-900
                    "
                  >
                    Skill Assessment
                  </h2>

                  <p
                    className="
                      leading-8
                      text-slate-700
                    "
                  >
                    {summary.skill_assessment}
                  </p>

                </section>

                {/* Experience Summary */}

                <section
                  className="
                    rounded-[24px]
                    border-2
                    border-violet-200
                    bg-violet-50/30
                    p-6
                  "
                >

                  <h2
                    className="
                      mb-4
                      text-xl
                      font-semibold
                      text-slate-900
                    "
                  >
                    Experience Summary
                  </h2>

                  <p
                    className="
                      leading-8
                      text-slate-700
                    "
                  >
                    {summary.experience_summary}
                  </p>

                </section>

              </div>

            </div>

            {/* ====================================== */}
            {/* Recommendation */}
            {/* ====================================== */}

            <section
              className="
                rounded-[24px]
                border-2
                border-pink-200
                bg-pink-50/30
                p-6
              "
            >

              <h2
                className="
                  mb-4
                  text-xl
                  font-semibold
                  text-slate-900
                "
              >
                Hiring Recommendation
              </h2>

              <p
                className="
                  leading-8
                  text-slate-700
                "
              >
                {summary.hiring_recommendation}
              </p>

            </section>

          </>

        )}

        {/* ====================================== */}
        {/* Empty State */}
        {/* ====================================== */}

        {!summary && !loading && (

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

            <User
              size={42}
              className="
                mx-auto
                text-violet-500
              "
            />

            <h2
              className="
                mt-4
                text-2xl
                font-semibold
                text-slate-900
              "
            >
              Candidate Summary
            </h2>

            <p
              className="
                mt-3
                text-slate-500
              "
            >
              Select a candidate and generate
              an AI-powered summary.
            </p>

          </section>

        )}

      </div>

    </MainLayout>

  );

}