import {
  User,
  Mail,
  Phone,
  FileText,
} from "lucide-react";

/*
=======================================
Candidate Information Card
=======================================
*/

export default function CandidateInfoCard({
  candidate,
}) {

  if (!candidate) return null;

  const resumePreview =
    candidate.resume_text
      ? candidate.resume_text.length > 450
        ? candidate.resume_text.slice(0, 450) + "..."
        : candidate.resume_text
      : "Resume preview not available.";

  const InfoRow = ({
    icon: Icon,
    label,
    value,
  }) => (

    <div
      className="
        flex
        items-center
        gap-4
        rounded-2xl
        border
        border-violet-100
        bg-violet-50/40
        p-4
      "
    >

      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-white
          shadow-sm
        "
      >

        <Icon
          size={18}
          className="text-violet-600"
        />

      </div>

      <div className="flex-1">

        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-wide
            text-slate-500
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            text-sm
            font-medium
            text-slate-800
            break-all
          "
        >
          {value || "-"}
        </p>

      </div>

    </div>

  );

  return (

    <section
      className="
        overflow-hidden
        rounded-[28px]
        border
        border-violet-200
        bg-white
        shadow-[0_10px_30px_rgba(120,80,180,0.08)]
      "
    >

      {/* ====================================== */}
      {/* Header */}
      {/* ====================================== */}

      <div
        className="
          bg-gradient-to-r
          from-violet-600
          to-pink-500
          px-6
          py-5
        "
      >

        <h2
          className="
            text-xl
            font-bold
            text-white
          "
        >
          Candidate Information
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-violet-100
          "
        >
          Details of the selected candidate
        </p>

      </div>

      {/* ====================================== */}
      {/* Body */}
      {/* ====================================== */}

      <div className="space-y-4 p-6">

        <InfoRow
          icon={User}
          label="Name"
          value={candidate.full_name}
        />

        <InfoRow
          icon={Mail}
          label="Email"
          value={candidate.email}
        />

        <InfoRow
          icon={Phone}
          label="Phone"
          value={candidate.phone}
        />

        {/* ====================================== */}
        {/* Resume Preview */}
        {/* ====================================== */}

        <div
          className="
            rounded-2xl
            border
            border-pink-200
            bg-pink-50/40
            p-5
          "
        >

          <div
            className="
              mb-4
              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-white
                shadow-sm
              "
            >

              <FileText
                size={18}
                className="text-pink-600"
              />

            </div>

            <div>

              <h3
                className="
                  font-semibold
                  text-slate-900
                "
              >
                Resume Preview
              </h3>

              <p
                className="
                  text-xs
                  text-slate-500
                "
              >
                First few lines from the uploaded resume
              </p>

            </div>

          </div>

          <div
            className="
              max-h-64
              overflow-y-auto
              rounded-xl
              bg-white
              p-4
              text-sm
              leading-7
              text-slate-700
            "
          >

            {resumePreview}

          </div>

        </div>

      </div>

    </section>

  );

}