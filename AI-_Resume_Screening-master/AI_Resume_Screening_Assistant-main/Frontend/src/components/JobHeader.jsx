import {
  BriefcaseBusiness,
  ChevronDown,
} from "lucide-react";

export default function JobHeader({
  createJobOpen,
  setCreateJobOpen,
}) {
  return (
    <>

      {/* ====================================== */}
      {/* HEADER */}
      {/* ====================================== */}

      <div
        className="
          flex
          flex-col
          gap-6
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >

        {/* ====================================== */}
        {/* LEFT SIDE */}
        {/* ====================================== */}

        <div>

          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-violet-100
              bg-violet-50
              px-4
              py-2
            "
          >

            <BriefcaseBusiness
              size={16}
              className="mr-2 text-violet-600"
            />

            <span
              className="
                text-sm
                font-semibold
                text-violet-700
              "
            >
              Job Management
            </span>

          </div>

          <h1
            className="
              mt-5
              text-4xl
              font-black
              tracking-tight
              text-slate-900
            "
          >
            Job Openings
          </h1>

          <p
            className="
              mt-3
              max-w-2xl
              text-base
              leading-7
              text-slate-500
            "
          >
            Create and manage job openings
            for AI-powered resume screening
            and candidate matching.
          </p>

        </div>

        {/* ====================================== */}
        {/* RIGHT SIDE */}
        {/* ====================================== */}

        <div
          className="
            flex
            items-start
            lg:items-center
          "
        >

          <button
            onClick={() =>
              setCreateJobOpen(!createJobOpen)
            }
            className="
              group
              flex
              items-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-violet-600
              via-fuchsia-600
              to-pink-500
              px-6
              py-4
              font-semibold
              text-white
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_18px_40px_rgba(168,85,247,0.35)]
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
                bg-white/20
              "
            >

              <BriefcaseBusiness
                size={22}
              />

            </div>

            <div className="text-left">

              <p className="text-base font-bold">
                Create Job
              </p>

              <p className="text-xs text-pink-100">
                Add New Opening
              </p>

            </div>

            <ChevronDown
              size={22}
              className={`transition-transform duration-300 ${
                createJobOpen
                  ? "rotate-180"
                  : ""
              }`}
            />

          </button>

        </div>

      </div>

      {/* ====================================== */}
      {/* Divider */}
      {/* ====================================== */}

      <div
        className="
          mt-8
          h-px
          w-full
          bg-gradient-to-r
          from-transparent
          via-[#E9DDF6]
          to-transparent
        "
      />

    </>
  );
}