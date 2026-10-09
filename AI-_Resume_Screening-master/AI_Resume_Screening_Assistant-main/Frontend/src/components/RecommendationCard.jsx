import { BrainCircuit } from "lucide-react";

/*
=======================================
Recommendation Card
=======================================
*/

export default function RecommendationCard({
  recommendation = "",
}) {
  return (
    <section
      className="
        rounded-[28px]
        border
        border-[#EFE8F6]
        bg-white
        shadow-[0_10px_30px_rgba(120,80,180,0.06)]
      "
    >
      {/* ====================================== */}
      {/* Header */}
      {/* ====================================== */}

      <div
        className="
          flex
          items-center
          gap-4
          border-b
          border-[#EFE8F6]
          px-6
          py-5
        "
      >
        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-xl
            bg-violet-100
          "
        >
          <BrainCircuit
            size={22}
            className="text-violet-600"
          />
        </div>

        <div>

          <h2
            className="
              text-xl
              font-semibold
              text-slate-900
            "
          >
            AI Recommendation
          </h2>

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Final hiring recommendation.
          </p>

        </div>

      </div>

      {/* ====================================== */}
      {/* Body */}
      {/* ====================================== */}

      <div className="p-6">

        <p
          className="
            leading-8
            text-slate-700
          "
        >
          {recommendation ||
            "No recommendation available."}
        </p>

      </div>

    </section>
  );
}