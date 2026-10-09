import { CheckCircle2 } from "lucide-react";

/*
=======================================
Analysis Card
=======================================
*/

export default function AnalysisCard({
  title,
  items = [],
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
          border-b
          border-[#EFE8F6]
          px-6
          py-5
        "
      >
        <h2
          className="
            text-xl
            font-semibold
            text-slate-900
          "
        >
          {title}
        </h2>
      </div>

      {/* ====================================== */}
      {/* Body */}
      {/* ====================================== */}

      <div className="p-6">

        {items.length === 0 ? (

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            No analysis available.
          </p>

        ) : (

          <ul className="space-y-4">

            {items.map(
              (item, index) => (

                <li
                  key={index}
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >

                  <CheckCircle2
                    size={18}
                    className="
                      mt-1
                      text-green-600
                      flex-shrink-0
                    "
                  />

                  <span
                    className="
                      text-slate-700
                      leading-7
                    "
                  >
                    {item}
                  </span>

                </li>

              )
            )}

          </ul>

        )}

      </div>

    </section>
  );
}