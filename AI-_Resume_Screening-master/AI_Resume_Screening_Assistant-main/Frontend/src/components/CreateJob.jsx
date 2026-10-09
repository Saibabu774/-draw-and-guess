import { useState } from "react";

export default function CreateJob({
  onCreateJob,
  loading,
}) {

  const [formData, setFormData] =
    useState({
      title: "",
      experience_required: "",
      location: "",
      employment_type: "Full Time",
      description: "",
      skills: "",
    });

  /*
  ===========================================
  Handle Input
  ===========================================
  */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  /*
  ===========================================
  Submit
  ===========================================
  */

  const handleSubmit = () => {

    if (
      !formData.title ||
      !formData.description
    ) {

      alert(
        "Job Title and Description are required."
      );

      return;

    }

    onCreateJob({

      ...formData,

      skills: formData.skills
        .split(",")
        .map(skill => skill.trim())
        .filter(Boolean),

    });

  };

  return (

    <div
      className="
        mt-8
        rounded-[32px]
        border
        border-[#EFE8F6]
        bg-[#FCFAFD]
        p-8
        shadow-[0_12px_35px_rgba(120,80,180,0.08)]
      "
    >

          <h2
        className="
          text-2xl
          font-bold
          text-slate-900
        "
      >
        Create New Job
      </h2>

      <p
        className="
          mt-2
          text-sm
          leading-6
          text-slate-500
        "
      >
        Fill in the job details to publish a
        new opening for AI-powered resume
        screening and candidate matching.
      </p>

      <div
        className="
          mt-8
          grid
          gap-6
          md:grid-cols-2
        "
      >

        {/* =============================== */}
        {/* Job Title */}
        {/* =============================== */}

        <div>

          <label
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Job Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Python Developer"
            className="
              w-full
              rounded-2xl
              border
              border-[#E7DFF5]
              bg-white
              px-5
              py-4
              outline-none
              transition
              focus:border-fuchsia-500
            "
          />

        </div>

        {/* =============================== */}
        {/* Experience */}
        {/* =============================== */}

        <div>

          <label
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Experience Required
          </label>

          <input
            type="text"
            name="experience_required"
            value={formData.experience_required}
            onChange={handleChange}
            placeholder="2+ Years"
            className="
              w-full
              rounded-2xl
              border
              border-[#E7DFF5]
              bg-white
              px-5
              py-4
              outline-none
              transition
              focus:border-fuchsia-500
            "
          />

        </div>

        {/* =============================== */}
        {/* Location */}
        {/* =============================== */}

        <div>

          <label
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Chennai"
            className="
              w-full
              rounded-2xl
              border
              border-[#E7DFF5]
              bg-white
              px-5
              py-4
              outline-none
              transition
              focus:border-fuchsia-500
            "
          />

        </div>

        {/* =============================== */}
        {/* Employment Type */}
        {/* =============================== */}

        <div>

          <label
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Employment Type
          </label>

          <select
            name="employment_type"
            value={formData.employment_type}
            onChange={handleChange}
            className="
              w-full
              rounded-2xl
              border
              border-[#E7DFF5]
              bg-white
              px-5
              py-4
              outline-none
              transition
              focus:border-fuchsia-500
            "
          >

            <option>
              Full Time
            </option>

            <option>
              Part Time
            </option>

            <option>
              Internship
            </option>

            <option>
              Contract
            </option>

          </select>

        </div>

                {/* =============================== */}
        {/* Description */}
        {/* =============================== */}

        <div className="md:col-span-2">

          <label
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Job Description
          </label>

          <textarea
            name="description"
            rows={6}
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the job responsibilities, required qualifications, and expectations..."
            className="
              w-full
              resize-none
              rounded-2xl
              border
              border-[#E7DFF5]
              bg-white
              px-5
              py-4
              outline-none
              transition
              focus:border-fuchsia-500
            "
          />

        </div>

        {/* =============================== */}
        {/* Skills */}
        {/* =============================== */}

        <div className="md:col-span-2">

          <label
            className="
              mb-2
              block
              text-sm
              font-semibold
              text-slate-700
            "
          >
            Required Skills
          </label>

          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Python, FastAPI, SQL, React"
            className="
              w-full
              rounded-2xl
              border
              border-[#E7DFF5]
              bg-white
              px-5
              py-4
              outline-none
              transition
              focus:border-fuchsia-500
            "
          />

          <p
            className="
              mt-2
              text-xs
              text-slate-500
            "
          >
            Enter multiple skills separated by commas.
          </p>

        </div>

              </div>

      {/* =============================== */}
      {/* Create Button */}
      {/* =============================== */}

      <div className="mt-8">

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className={`
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-violet-600
            via-fuchsia-600
            to-pink-500
            px-6
            py-4
            text-lg
            font-semibold
            text-white
            shadow-lg
            transition-all
            duration-300
            ${
              loading
                ? "cursor-not-allowed opacity-70"
                : "hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(168,85,247,0.35)]"
            }
          `}
        >

          {loading
            ? "Creating Job..."
            : "Create Job"}

        </button>

      </div>

    </div>

  );

}