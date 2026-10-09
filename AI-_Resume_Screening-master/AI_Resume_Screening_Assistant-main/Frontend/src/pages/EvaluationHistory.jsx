import { useEffect, useState } from "react";

import {
  History,
} from "lucide-react";

import MainLayout from "../layout/MainLayout";

import aiService from "../services/aiService";

/*
=======================================
Evaluation History
=======================================
*/

export default function EvaluationHistory() {

  /*
  =======================================
  State
  =======================================
  */

  const [loading, setLoading] =
    useState(true);

  const [history, setHistory] =
    useState([]);

  /*
  =======================================
  Load History
  =======================================
  */

  useEffect(() => {

    loadHistory();

  }, []);

  const loadHistory =
    async () => {

      try {

        const data =
          await aiService.getHistory();

        setHistory(data);

      } catch (error) {

        console.error(error);

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
                to-pink-500
              "
            >

              <History
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
                Evaluation History
              </h1>

              <p
                className="
                  mt-2
                  text-sm
                  text-slate-500
                "
              >
                View all previous AI resume
                evaluations and recommendations.
              </p>

            </div>

          </div>

        </section>

        {/* ====================================== */}
        {/* Loading */}
        {/* ====================================== */}

        {loading && (

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

            <History
              size={42}
              className="
                mx-auto
                animate-pulse
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
              Loading History...
            </h2>

          </section>

        )}

        {!loading && (
                      history.length > 0 ? (

            <div className="space-y-6">

              {history.map((item, index) => (

                <section
                  key={index}
                  className="
                    rounded-[28px]
                    border
                    border-[#EFE8F6]
                    bg-white
                    p-6
                    shadow-[0_10px_30px_rgba(120,80,180,0.06)]
                  "
                >

                  {/* ====================================== */}
                  {/* Top */}
                  {/* ====================================== */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-4
                      md:flex-row
                      md:items-center
                      md:justify-between
                    "
                  >

                    <div>

                      <h2
                        className="
                          text-2xl
                          font-bold
                          text-slate-900
                        "
                      >
                        {item.candidate_name}
                      </h2>

                      <p
                        className="
                          mt-1
                          text-slate-500
                        "
                      >
                        {item.job_title}
                      </p>

                    </div>

                    <div
                      className="
                        inline-flex
                        items-center
                        rounded-full
                        bg-gradient-to-r
                        from-violet-600
                        to-pink-500
                        px-5
                        py-2
                        text-lg
                        font-bold
                        text-white
                      "
                    >
                      {item.match_score}% Match
                    </div>

                  </div>

                  {/* ====================================== */}
                  {/* Skills */}
                  {/* ====================================== */}

                  <div
                    className="
                      mt-8
                      grid
                      gap-6
                      md:grid-cols-2
                    "
                  >

                    {/* Matching Skills */}

                    <div
                      className="
                        rounded-2xl
                        border-2
                        border-violet-200
                        bg-violet-50/40
                        p-5
                      "
                    >

                      <h3
                        className="
                          mb-4
                          text-lg
                          font-semibold
                          text-slate-900
                        "
                      >
                        Matching Skills
                      </h3>

                      <p
                        className="
                          whitespace-pre-wrap
                          leading-7
                          text-slate-700
                        "
                      >
                        {item.matching_skills}
                      </p>

                    </div>

                    {/* Missing Skills */}

                    <div
                      className="
                        rounded-2xl
                        border-2
                        border-pink-200
                        bg-pink-50/40
                        p-5
                      "
                    >

                      <h3
                        className="
                          mb-4
                          text-lg
                          font-semibold
                          text-slate-900
                        "
                      >
                        Missing Skills
                      </h3>

                      <p
                        className="
                          whitespace-pre-wrap
                          leading-7
                          text-slate-700
                        "
                      >
                        {item.missing_skills}
                      </p>

                    </div>

                  </div>

                  {/* ====================================== */}
                  {/* Analysis */}
                  {/* ====================================== */}

                  <div
                    className="
                      mt-6
                      grid
                      gap-6
                      md:grid-cols-2
                    "
                  >

                    {/* Strengths */}

                    <div
                      className="
                        rounded-2xl
                        border-2
                        border-emerald-200
                        bg-emerald-50/40
                        p-5
                      "
                    >

                      <h3
                        className="
                          mb-4
                          text-lg
                          font-semibold
                          text-slate-900
                        "
                      >
                        Strengths
                      </h3>

                      <p
                        className="
                          whitespace-pre-wrap
                          leading-7
                          text-slate-700
                        "
                      >
                        {item.strengths}
                      </p>

                    </div>

                    {/* Weaknesses */}

                    <div
                      className="
                        rounded-2xl
                        border-2
                        border-red-200
                        bg-red-50/40
                        p-5
                      "
                    >

                      <h3
                        className="
                          mb-4
                          text-lg
                          font-semibold
                          text-slate-900
                        "
                      >
                        Weaknesses
                      </h3>

                      <p
                        className="
                          whitespace-pre-wrap
                          leading-7
                          text-slate-700
                        "
                      >
                        {item.weaknesses}
                      </p>

                    </div>

                  </div>

                  {/* ====================================== */}
                  {/* Recommendation */}
                  {/* ====================================== */}

                  <div
                    className="
                      mt-6
                      rounded-2xl
                      border-2
                      border-amber-200
                      bg-amber-50/40
                      p-5
                    "
                  >

                    <h3
                      className="
                        mb-4
                        text-lg
                        font-semibold
                        text-slate-900"
                      >
                      Recommendation
                    </h3>

                    <p
                      className="
                        whitespace-pre-wrap
                        leading-7
                        text-slate-700
                      "
                    >
                      {item.recommendation}
                    </p>

                  </div>

                </section>

              ))}

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

              <History
                size={42}
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
                No Evaluation History
              </h2>

              <p
                className="
                  mt-3
                  text-slate-500
                "
              >
                Resume matching results will
                appear here after evaluations
                are completed.
              </p>

            </section>

          )

        )}

      </div>

    </MainLayout>

  );

}