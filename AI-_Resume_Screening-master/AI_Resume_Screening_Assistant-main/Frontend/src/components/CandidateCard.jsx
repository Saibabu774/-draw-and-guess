import {
  Eye,
  Trash2,
  Mail,
} from "lucide-react";

export default function CandidateCard({
  candidate,
  onView,
  onDelete,
}) {

  return (

    <div
      className="
        group
        overflow-hidden
        rounded-[28px]
        border
        border-[#EFE8F6]
        bg-[#FCFAFD]
        p-6
        shadow-[0_10px_30px_rgba(120,80,180,0.06)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_18px_40px_rgba(120,80,180,0.12)]
      "
    >

      {/* Avatar */}

      <div
        className="
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-violet-600
          via-fuchsia-500
          to-pink-500
          text-2xl
          font-bold
          text-white
        "
      >

        {candidate.full_name
          ?.charAt(0)
          ?.toUpperCase()}

      </div>

      {/* Candidate Name */}

      <h3
        className="
          mt-5
          text-xl
          font-bold
          text-slate-900
        "
      >

        {candidate.full_name}

      </h3>

            {/* Email */}

      <div
        className="
          mt-4
          flex
          items-center
          gap-2
        "
      >

        <Mail
          size={16}
          className="text-fuchsia-500"
        />

        <p
          className="
            truncate
            text-sm
            text-slate-600
          "
        >

          {candidate.email}

        </p>

      </div>

      {/* Candidate ID */}

      <div className="mt-5">

        <span
          className="
            inline-flex
            items-center
            rounded-full
            bg-violet-50
            px-4
            py-2
            text-xs
            font-semibold
            text-violet-700
          "
        >

          Candidate ID :
          {" "}
          #{candidate.id}

        </span>

      </div>

      {/* Divider */}

      <div
        className="
          my-6
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#E9DDF6]
          to-transparent
        "
      />
            {/* ====================================== */}
      {/* ACTION BUTTONS */}
      {/* ====================================== */}

      <div
        className="
          flex
          gap-3
        "
      >

        <button
          onClick={() => onView(candidate)}
          className="
            flex
            flex-1
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-violet-100
            py-3
            font-semibold
            text-violet-700
            transition-all
            duration-300
            hover:bg-violet-200
          "
        >

          <Eye size={18} />

          View

        </button>

        <button
          onClick={() => onDelete(candidate)}
          className="
            flex
            flex-1
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-red-50
            py-3
            font-semibold
            text-red-600
            transition-all
            duration-300
            hover:bg-red-100
          "
        >

          <Trash2 size={18} />

          Delete

        </button>

      </div>

      {/* Hover Accent */}

      <div
        className="
          mt-6
          h-1
          w-0
          rounded-full
          bg-gradient-to-r
          from-violet-600
          via-fuchsia-500
          to-pink-500
          transition-all
          duration-300
          group-hover:w-full
        "
      />

    </div>

  );
}