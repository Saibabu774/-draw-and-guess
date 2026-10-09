import MainLayout from "../layout/MainLayout";

import HeroCard from "../components/HeroCard";
import StatsGrid from "../components/StatsGrid";

export default function Dashboard() {

  return (

    <MainLayout>

      <div
        className="
          flex
          flex-col
          gap-8
        "
      >

        {/* ====================================== */}
        {/* HERO SECTION */}
        {/* ====================================== */}

        <HeroCard />

        {/* ====================================== */}
        {/* KPI CARDS */}
        {/* ====================================== */}

        <StatsGrid />

                {/* ====================================== */}
        {/* RECENT CANDIDATES */}
        {/* ====================================== */}

        <section>

          <div className="mb-6 flex items-center justify-between">

            <div>

              <h2
                className="
                  text-2xl
                  font-bold
                  text-slate-900
                "
              >

                Recent Candidates

              </h2>

              <p
                className="
                  mt-1
                  text-sm
                  text-slate-500
                "
              >

                Newly added candidates will appear here.

              </p>

            </div>

          </div>

          <div
            className="
              rounded-[30px]
              border
              border-[#EFE8F6]
              bg-[#FCFAFD]
              p-10
              shadow-[0_10px_30px_rgba(120,80,180,0.06)]
            "
          >

            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                py-12
              "
            >

              <div
                className="
                  flex
                  h-20
                  w-20
                  items-center
                  justify-center
                  rounded-3xl
                  bg-gradient-to-br
                  from-violet-600
                  via-fuchsia-500
                  to-pink-500
                  shadow-lg
                "
              >

                👤

              </div>

              <h3
                className="
                  mt-6
                  text-xl
                  font-bold
                  text-slate-800
                "
              >

                No Candidates Available

              </h3>

              <p
                className="
                  mt-3
                  max-w-md
                  text-center
                  leading-7
                  text-slate-500
                "
              >

                Candidate profiles will automatically
                appear here after HR uploads resumes
                through the Candidates module.

              </p>

            </div>

          </div>

        </section>

                {/* ====================================== */}
        {/* AI RECRUITMENT INSIGHTS */}
        {/* ====================================== */}

        <section>

          <div className="mb-6">

            <h2
              className="
                text-2xl
                font-bold
                text-slate-900
              "
            >

              AI Recruitment Insights

            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
              "
            >

              AI capabilities currently available in your recruitment platform.

            </p>

          </div>

          <div
            className="
              overflow-hidden
              rounded-[30px]
              border
              border-[#EFE8F6]
              bg-[#FCFAFD]
              shadow-[0_10px_30px_rgba(120,80,180,0.06)]
            "
          >

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

              <h3
                className="
                  text-xl
                  font-bold
                  text-slate-900
                "
              >

                AI Features Status

              </h3>

              <p
                className="
                  mt-2
                  text-sm
                  text-slate-600
                "
              >

                Your AI-powered recruitment services are ready to assist recruiters.

              </p>

            </div>

            <div className="grid gap-6 p-8 md:grid-cols-2">

              <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">

                <div className="flex items-center justify-between">

                  <h4 className="font-bold text-slate-800">
                    Resume Parsing
                  </h4>

                  <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
                    Ready
                  </span>

                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Extract candidate information automatically from uploaded resumes.
                </p>

              </div>

              <div className="rounded-2xl border border-violet-100 bg-violet-50 p-5">

                <div className="flex items-center justify-between">

                  <h4 className="font-bold text-slate-800">
                    Resume Matching
                  </h4>

                  <span className="rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white">
                    Ready
                  </span>

                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Match resumes against job descriptions using AI.
                </p>

              </div>

              <div className="rounded-2xl border border-pink-100 bg-pink-50 p-5">

                <div className="flex items-center justify-between">

                  <h4 className="font-bold text-slate-800">
                    Interview Questions
                  </h4>

                  <span className="rounded-full bg-pink-500 px-3 py-1 text-xs font-semibold text-white">
                    Ready
                  </span>

                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Generate technical interview questions instantly with AI.
                </p>

              </div>

              <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5">

                <div className="flex items-center justify-between">

                  <h4 className="font-bold text-slate-800">
                    Candidate Summary
                  </h4>

                  <span className="rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-white">
                    Ready
                  </span>

                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  Generate concise AI summaries for faster hiring decisions.
                </p>

              </div>

            </div>

          </div>

        </section>

      </div>

    </MainLayout>

  );
}