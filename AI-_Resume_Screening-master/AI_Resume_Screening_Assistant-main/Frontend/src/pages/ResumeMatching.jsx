import { useState } from "react";

import MainLayout from "../layout/MainLayout";

import MatchHeader from "../components/MatchHeader";
import MatchForm from "../components/MatchForm";
import CandidateInfoCard from "../components/CandidateInfoCard";
import MatchScoreCard from "../components/MatchScoreCard";
import SkillsCard from "../components/SkillsCard";
import AnalysisCard from "../components/AnalysisCard";
import RecommendationCard from "../components/RecommendationCard";

import aiService from "../services/aiService";
import candidateService from "../services/candidateService";

/*
=======================================
Resume Matching Page
=======================================
*/

export default function ResumeMatching() {

  /*
  =======================================
  State
  =======================================
  */

  const [loading, setLoading] =
    useState(false);

  const [analysis, setAnalysis] =
    useState(null);

  const [candidate, setCandidate] =
    useState(null);

  /*
  =======================================
  Analyze Resume
  =======================================
  */

  const handleAnalyze = async ({
    candidate_id,
    job_id,
  }) => {

    try {

      setLoading(true);

      const [
        analysisResult,
        candidateResult,
      ] = await Promise.all([

        aiService.matchResume(
          candidate_id,
          job_id
        ),

        candidateService.getCandidate(
          candidate_id
        ),

      ]);

      setAnalysis(
        analysisResult
      );

      setCandidate(
        candidateResult
      );

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Unable to analyze resume."
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

        <MatchHeader />

        {/* ====================================== */}
        {/* Match Form */}
        {/* ====================================== */}

        <MatchForm
          onAnalyze={handleAnalyze}
          loading={loading}
        />

        {/* ====================================== */}
        {/* Result */}
        {/* ====================================== */}

        {analysis && candidate && (

          <>

            {/* ====================================== */}
            {/* Candidate + AI Result */}
            {/* ====================================== */}

            <div
              className="
                grid
                gap-8
                lg:grid-cols-3
              "
            >

              {/* Left */}

              <div>

                <CandidateInfoCard
                  candidate={candidate}
                />

              </div>

              {/* Right */}

              <div
                className="
                  space-y-6
                  lg:col-span-2
                "
              >

                <MatchScoreCard
                  score={
                    analysis.match_score
                  }
                />

                <div
                  className="
                    grid
                    gap-6
                    md:grid-cols-2
                  "
                >

                  <SkillsCard
                    title="Matching Skills"
                    skills={
                      analysis.matching_skills
                    }
                    type="matching"
                  />

                  <SkillsCard
                    title="Missing Skills"
                    skills={
                      analysis.missing_skills
                    }
                    type="missing"
                  />

                </div>

              </div>

            </div>

                        {/* ====================================== */}
            {/* Strengths */}
            {/* ====================================== */}

            <AnalysisCard
              title="Strengths"
              items={analysis.strengths}
            />

            {/* ====================================== */}
            {/* Recommendation */}
            {/* ====================================== */}

            <RecommendationCard
              recommendation={
                analysis.recommendation
              }
            />

          </>

        )}

        {/* ====================================== */}
        {/* Empty State */}
        {/* ====================================== */}

        {!analysis && !loading && (

          <section
            className="
              rounded-[28px]
              border
              border-[#EFE8F6]
              bg-white
              p-12
              text-center
              shadow-[0_10px_30px_rgba(120,80,180,0.06)]
            "
          >

            <h2
              className="
                text-2xl
                font-semibold
                text-slate-900
              "
            >
              AI Resume Matching
            </h2>

            <p
              className="
                mx-auto
                mt-4
                max-w-2xl
                leading-7
                text-slate-500
              "
            >
              Select a candidate and a job position,
              then click <strong>Analyze Resume</strong> to
              generate the AI match score, skills analysis,
              strengths, and hiring recommendation.
            </p>

          </section>

        )}

      </div>

    </MainLayout>

  );

}