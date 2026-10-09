import JobCard from "./JobCard";

export default function JobGrid({
  jobs,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <div
      className="
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >

      {/* Job Cards */}

      {jobs.map((job) => (

        <JobCard
          key={job.id}
          job={job}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />

      ))}

      {/* Empty State */}

      {jobs.length === 0 && (

        <div
          className="
            col-span-full
            rounded-[28px]
            border
            border-dashed
            border-[#DDD6F3]
            bg-[#FCFAFD]
            p-16
            text-center
          "
        >

          <div
            className="
              mx-auto
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
              text-white
            "
          >
            💼
          </div>

          <h2
            className="
              mt-6
              text-2xl
              font-bold
              text-slate-800
            "
          >
            No Job Openings Yet
          </h2>

          <p
            className="
              mx-auto
              mt-3
              max-w-md
              leading-7
              text-slate-500
            "
          >
            Create your first job opening
            to begin AI-powered recruitment
            and resume screening.
          </p>

        </div>

      )}

    </div>
  );
}