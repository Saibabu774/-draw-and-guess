import { BrainCircuit } from "lucide-react";

/*
=======================================
Resume Matching Header
=======================================
*/

export default function MatchHeader() {
  return (
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

        {/* Icon */}

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

        {/* Title */}

        <div>

          <h1
            className="
              text-3xl
              font-bold
              text-slate-900
            "
          >
            Resume Matching
          </h1>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
            Compare a candidate's resume with the selected job description
            using AI and generate a match score, skills analysis, strengths,
            and hiring recommendation.
          </p>

        </div>

      </div>
    </section>
  );
}