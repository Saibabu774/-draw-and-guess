import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import {
  BrainCircuit,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

export default function Register() {

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] =
    useState({
      full_name: "",
      email: "",
      password: "",
      role: "Recruiter",
    });

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const result =
        await register(formData);

      if (result.success) {

        alert(
          "Registration Successful!"
        );

        navigate("/login");

      } else {

        alert(result.message);

      }

    } catch (error) {

      console.error(error);

      alert(
        "Registration failed."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-gradient-to-br
        from-[#40115E]
        via-[#7A1FA2]
        to-[#EC4899]
      "
    >

      {/* ====================================== */}
      {/* Background Glow */}
      {/* ====================================== */}

      <div className="absolute -top-40 -left-32 h-[420px] w-[420px] rounded-full bg-fuchsia-400/20 blur-[120px]" />

      <div className="absolute top-0 right-0 h-[380px] w-[380px] rounded-full bg-pink-300/20 blur-[120px]" />

      <div className="absolute bottom-0 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full bg-violet-300/20 blur-[120px]" />

      {/* ====================================== */}
      {/* Register Container */}
      {/* ====================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-screen
          items-center
          justify-center
          px-6
        "
      >

        <div
          className="
            w-full
            max-w-md
          "
        >

          <div
            className="
              rounded-[36px]
              border
              border-white/30
              bg-white/90
              p-10
              shadow-[0_35px_80px_rgba(0,0,0,0.30)]
              backdrop-blur-2xl
            "
          >

            {/* ====================================== */}
            {/* Logo */}
            {/* ====================================== */}

            <div className="flex justify-center">

              <div
                className="
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
                  shadow-xl
                "
              >

                <BrainCircuit
                  size={40}
                  className="text-white"
                />

              </div>

            </div>

            {/* ====================================== */}
            {/* Platform Name */}
            {/* ====================================== */}

            <p
              className="
                mt-5
                text-center
                text-sm
                font-semibold
                uppercase
                tracking-[0.18em]
                text-violet-600
              "
            >
              AI Resume Screening Platform
            </p>

            <h2
              className="
                mt-3
                text-center
                text-4xl
                font-black
                text-slate-900
              "
            >
              Create Account
            </h2>

            <p
              className="
                mt-3
                text-center
                text-slate-500
              "
            >
              Create your account to access
              the AI recruitment platform.
            </p>

            {/* ====================================== */}
            {/* Register Form */}
            {/* ====================================== */}

            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-5"
            >
                            {/* ====================================== */}
              {/* Full Name */}
              {/* ====================================== */}

              <div className="relative">

                <User
                  size={20}
                  className="
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="text"
                  name="full_name"
                  placeholder="Full Name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    py-5
                    pl-16
                    pr-6
                    outline-none
                    transition-all
                    duration-300
                    focus:border-fuchsia-400
                    focus:ring-4
                    focus:ring-fuchsia-100
                  "
                />

              </div>

              {/* ====================================== */}
              {/* Email */}
              {/* ====================================== */}

              <div className="relative">

                <Mail
                  size={20}
                  className="
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    py-5
                    pl-16
                    pr-6
                    outline-none
                    transition-all
                    duration-300
                    focus:border-fuchsia-400
                    focus:ring-4
                    focus:ring-fuchsia-100
                  "
                />

              </div>

              {/* ====================================== */}
              {/* Password */}
              {/* ====================================== */}

              <div className="relative">

                <Lock
                  size={20}
                  className="
                    absolute
                    left-5
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    py-5
                    pl-16
                    pr-16
                    outline-none
                    transition-all
                    duration-300
                    focus:border-fuchsia-400
                    focus:ring-4
                    focus:ring-fuchsia-100
                  "
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="
                    absolute
                    right-5
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    transition
                    hover:text-fuchsia-500
                  "
                >

                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}

                </button>

              </div>

              {/* ====================================== */}
              {/* Role */}
              {/* ====================================== */}

              <div>

                <label
                  className="
                    mb-3
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Select Role
                </label>

                <div className="grid grid-cols-2 gap-4">

                  <label
                    className={`
                      cursor-pointer
                      rounded-2xl
                      border-2
                      p-4
                      text-center
                      font-medium
                      transition-all
                      ${
                        formData.role === "Recruiter"
                          ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-fuchsia-300"
                      }
                    `}
                  >

                    <input
                      type="radio"
                      name="role"
                      value="Recruiter"
                      checked={
                        formData.role ===
                        "Recruiter"
                      }
                      onChange={handleChange}
                      className="hidden"
                    />

                    Recruiter

                  </label>

                  <label
                    className={`
                      cursor-pointer
                      rounded-2xl
                      border-2
                      p-4
                      text-center
                      font-medium
                      transition-all
                      ${
                        formData.role === "HR"
                          ? "border-fuchsia-500 bg-fuchsia-50 text-fuchsia-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-fuchsia-300"
                      }
                    `}
                  >

                    <input
                      type="radio"
                      name="role"
                      value="HR"
                      checked={
                        formData.role ===
                        "HR"
                      }
                      onChange={handleChange}
                      className="hidden"
                    />

                    HR

                  </label>

                </div>

              </div>

              {/* ====================================== */}
              {/* Register Button */}
              {/* ====================================== */}

              <button
                type="submit"
                disabled={loading}
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-gradient-to-r
                  from-violet-600
                  via-fuchsia-500
                  to-pink-500
                  py-5
                  text-lg
                  font-semibold
                  text-white
                  shadow-xl
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:shadow-2xl
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                "
              >

                {loading
                  ? "Creating Account..."
                  : "Create Account"}

                {!loading && (

                  <ArrowRight
                    size={20}
                    className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                  />

                )}

              </button>

            </form>

            {/* ====================================== */}
            {/* Footer */}
            {/* ====================================== */}

            <div
              className="
                mt-8
                border-t
                border-slate-200
                pt-6
                text-center
              "
            >

              <p
                className="
                  text-sm
                  text-slate-500
                "
              >

                Already have an account?

                <button
                  type="button"
                  onClick={() =>
                    navigate("/login")
                  }
                  className="
                    ml-2
                    font-semibold
                    text-fuchsia-600
                    transition
                    hover:text-pink-600
                  "
                >
                  Sign In
                </button>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}