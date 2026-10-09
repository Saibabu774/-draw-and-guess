import {
  CheckCircle2,
  XCircle,
} from "lucide-react";

/*
=======================================
Skills Card
=======================================
*/

export default function SkillsCard({
  title,
  skills = [],
  type = "matching",
}) {
  const isMatching =
    type === "matching";

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

        {skills.length === 0 ? (

          <p
            className="
              text-sm
              text-slate-500
            "
          >
            No skills available.
          </p>

        ) : (

          <ul className="space-y-4">

            {skills.map(
              (skill, index) => (

                <li
                  key={index}
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >

                  {isMatching ? (

                    <CheckCircle2
                      size={18}
                      className="text-green-600"
                    />

                  ) : (

                    <XCircle
                      size={18}
                      className="text-red-500"
                    />

                  )}

                  <span
                    className="
                      text-slate-700
                    "
                  >
                    {skill}
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