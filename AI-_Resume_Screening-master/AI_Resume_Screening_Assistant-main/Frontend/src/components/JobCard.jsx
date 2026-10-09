import {
  MapPin,
  BriefcaseBusiness,
  Clock3,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

export default function JobCard({
  job,
  onView,
  onEdit,
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

      {/* ====================================== */}
      {/* Job Icon */}
      {/* ====================================== */}

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
          text-white
        "
      >

        <BriefcaseBusiness size={30} />

      </div>

      {/* ====================================== */}
      {/* Job Title */}
      {/* ====================================== */}

      <h2
        className="
          mt-5
          text-2xl
          font-bold
          text-slate-900
        "
      >

        {job.title}

      </h2>

            {/* ====================================== */}
      {/* Job Information */}
      {/* ====================================== */}

      <div
        className="
          mt-6
          grid
          grid-cols-1
          gap-3
        "
      >

        {/* Location */}

        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            bg-violet-50
            px-4
            py-3
          "
        >

          <MapPin
            size={18}
            className="text-violet-600"
          />

          <span
            className="
              text-sm
              font-medium
              text-slate-700
            "
          >

            {job.location || "Not Specified"}

          </span>

        </div>

        {/* Employment Type */}

        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            bg-fuchsia-50
            px-4
            py-3
          "
        >

          <BriefcaseBusiness
            size={18}
            className="text-fuchsia-600"
          />

          <span
            className="
              text-sm
              font-medium
              text-slate-700
            "
          >

            {job.employment_type || "N/A"}

          </span>

        </div>

        {/* Experience */}

        <div
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            bg-pink-50
            px-4
            py-3
          "
        >

          <Clock3
            size={18}
            className="text-pink-600"
          />

          <span
            className="
              text-sm
              font-medium
              text-slate-700
            "
          >

            {job.experience_required || "Not Specified"}

          </span>

        </div>

      </div>

            {/* ====================================== */}
      {/* Skills */}
      {/* ====================================== */}

      {job.skills &&
        job.skills.length > 0 && (

        <div className="mt-6">

          <h4
            className="
              mb-3
              text-sm
              font-semibold
              text-slate-700
            "
          >

            Required Skills

          </h4>

          <div
            className="
              flex
              flex-wrap
              gap-2
            "
          >

            {job.skills.map(
              (skill, index) => (

                <span
                  key={index}
                  className="
                    rounded-full
                    bg-gradient-to-r
                    from-violet-100
                    to-fuchsia-100
                    px-4
                    py-2
                    text-xs
                    font-semibold
                    text-violet-700
                  "
                >

                  {skill}

                </span>

              )
            )}

          </div>

        </div>

      )}

      {/* ====================================== */}
      {/* Divider */}
      {/* ====================================== */}

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
      {/* Actions */}
      {/* ====================================== */}

      <div
        className="
          flex
          gap-3
        "
      >

                <button
          onClick={() => onView(job)}
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
          onClick={() => onEdit(job)}
          className="
            flex
            flex-1
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-amber-100
            py-3
            font-semibold
            text-amber-700
            transition-all
            duration-300
            hover:bg-amber-200
          "
        >

          <Pencil size={18} />

          Edit

        </button>

        <button
          onClick={() => onDelete(job)}
          className="
            flex
            flex-1
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-red-100
            py-3
            font-semibold
            text-red-600
            transition-all
            duration-300
            hover:bg-red-200
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