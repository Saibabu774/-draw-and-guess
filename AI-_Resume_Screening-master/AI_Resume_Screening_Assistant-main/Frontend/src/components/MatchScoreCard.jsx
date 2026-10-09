import { BrainCircuit } from "lucide-react";

/*
=======================================
Match Score Card
=======================================
*/

export default function MatchScoreCard({
  score = 0,
}) {
  /*
  =======================================
  Match Status
  =======================================
  */

  let status = "Poor Match";
  let statusColor = "text-red-600";
  let badgeColor = "bg-red-100 text-red-700";

  if (score >= 85) {
    status = "Excellent Match";
    statusColor = "text-green-600";
    badgeColor = "bg-green-100 text-green-700";
  } else if (score >= 70) {
    status = "Good Match";
    statusColor = "text-violet-600";
    badgeColor = "bg-violet-100 text-violet-700";
  } else if (score >= 50) {
    status = "Average Match";
    statusColor = "text-amber-600";
    badgeColor = "bg-amber-100 text-amber-700";
  }

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
            size={24}
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
            AI Match Score
          </h2>

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            Overall resume compatibility
          </p>

        </div>
      </div>

      {/* ====================================== */}
      {/* Body */}
      {/* ====================================== */}

      <div
        className="
          flex
          flex-col
          items-center
          justify-center
          px-6
          py-10
        "
      >
        <h1
          className={`
            text-6xl
            font-bold
            ${statusColor}
          `}
        >
          {score}%
        </h1>

        <span
          className={`
            mt-5
            rounded-full
            px-4
            py-2
            text-sm
            font-semibold
            ${badgeColor}
          `}
        >
          {status}
        </span>
      </div>
    </section>
  );
}