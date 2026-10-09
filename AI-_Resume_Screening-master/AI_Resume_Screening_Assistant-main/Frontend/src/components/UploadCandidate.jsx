import { useRef, useState } from "react";



import {
  UploadCloud,
  FileText,
  X,
} from "lucide-react";

export default function UploadCandidate({
  onUpload,
  loading,
}) {

  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] =
    useState(null);

  const [dragActive, setDragActive] =
    useState(false);

  
  const [formData, setFormData] =
    useState({
      full_name: "",
      email: "",
      phone: "",
    });

  /*
  ============================================
  Handle Input Change
  ============================================
  */

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  };

  /*
  ============================================
  Select File
  ============================================
  */

  const handleFileSelect = (file) => {

    if (!file) return;

    setSelectedFile(file);

  };

  const handleSubmit = () => {

    if (!selectedFile) {

      alert("Please select a resume.");

      return;

    }

    if (
      !formData.full_name ||
      !formData.email
    ) {

      alert(
        "Full Name and Email are required."
      );

      return;

    }

    onUpload({
      ...formData,
      file: selectedFile,
    });

  };

  return (

    <div
      className="
        mt-8
        overflow-hidden
        rounded-[32px]
        border
        border-[#EFE8F6]
        bg-[#FCFAFD]
        shadow-[0_12px_35px_rgba(120,80,180,0.08)]
      "
    >

      <div
        className="
          grid
          gap-10
          p-8
          lg:grid-cols-2
        "
      >

                {/* ====================================== */}
        {/* LEFT SIDE - DRAG & DROP */}
        {/* ====================================== */}

        <div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() =>
              setDragActive(false)
            }
            onDrop={(e) => {
              e.preventDefault();

              setDragActive(false);

              handleFileSelect(
                e.dataTransfer.files[0]
              );
            }}
            className={`
              flex
              min-h-[360px]
              cursor-pointer
              flex-col
              items-center
              justify-center
              rounded-[28px]
              border-2
              border-dashed
              transition-all
              duration-300
              ${
                dragActive
                  ? "border-fuchsia-500 bg-fuchsia-50"
                  : "border-[#DDD6F3] bg-[#F9F7FC]"
              }
            `}
            onClick={() =>
              fileInputRef.current.click()
            }
          >

            {selectedFile ? (

              <>

                <FileText
                  size={60}
                  className="text-fuchsia-600"
                />

                <h3
                  className="
                    mt-5
                    text-xl
                    font-bold
                    text-slate-800
                  "
                >

                  {selectedFile.name}

                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    text-slate-500
                  "
                >

                  {(
                    selectedFile.size /
                    1024 /
                    1024
                  ).toFixed(2)}
                  {" "}MB

                </p>

                <button
                  type="button"
                  onClick={(e) => {

                    e.stopPropagation();

                    setSelectedFile(null);

                  }}
                  className="
                    mt-6
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-red-50
                    px-4
                    py-2
                    text-sm
                    font-semibold
                    text-red-600
                    transition
                    hover:bg-red-100
                  "
                >

                  <X size={16} />

                  Remove File

                </button>

              </>

            ) : (

              <>

                <UploadCloud
                  size={72}
                  className="
                    text-fuchsia-500
                  "
                />

                <h3
                  className="
                    mt-6
                    text-2xl
                    font-bold
                    text-slate-800
                  "
                >

                  Drag & Drop Resume

                </h3>

                <p
                  className="
                    mt-3
                    text-center
                    leading-7
                    text-slate-500
                  "
                >

                  Drop your resume here
                  or click anywhere to browse.

                </p>

                <span
                  className="
                    mt-6
                    rounded-xl
                    bg-fuchsia-600
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    text-white
                  "
                >

                  Browse Resume

                </span>

              </>

            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              hidden
              onChange={(e) =>
                handleFileSelect(
                  e.target.files[0]
                )
              }
            />

          </div>

        </div>

                {/* ====================================== */}
        {/* RIGHT SIDE - CANDIDATE DETAILS */}
        {/* ====================================== */}

        <div className="flex flex-col justify-center">

          <h2
            className="
              text-2xl
              font-bold
              text-slate-900
            "
          >

            Candidate Information

          </h2>

          <p
            className="
              mt-2
              text-sm
              leading-6
              text-slate-500
            "
          >

            Fill in the candidate details and
            upload the selected resume.

          </p>

          <div className="mt-8 space-y-6">

            {/* Full Name */}

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

                Full Name

              </label>

              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Enter candidate name"
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

            {/* Email */}

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

                Email Address

              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
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

            {/* Phone */}

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

                Phone Number

              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
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
                ? "Uploading..."
                : "Upload Candidate"}

            </button>

          </div>

        </div>

       </div>

    </div>

  );
}