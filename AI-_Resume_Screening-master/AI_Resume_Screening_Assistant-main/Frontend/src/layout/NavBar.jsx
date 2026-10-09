import {
  Bell,
  ChevronDown,
  Search,
} from "lucide-react";

import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const location = useLocation();

  const { user } = useAuth();

  /* =======================================
     Page Title
  ======================================= */

  const pageTitles = {
    "/dashboard": "Dashboard",
    "/candidates": "Candidates",
    "/jobs": "Jobs",
    "/resume-parser": "Resume Parser",
    "/resume-matching": "Resume Matching",
    "/candidate-summary": "Candidate Summary",
    "/interview-questions": "Interview Questions",
    "/users": "Users",
    "/history": "Evaluation History",
  };

  const pageTitle =
    pageTitles[location.pathname] || "Dashboard";

  /* =======================================
     Greeting
  ======================================= */

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  /* =======================================
     User Details
  ======================================= */

  const firstName =
    user?.full_name?.split(" ")[0] || "User";

  const initials =
    user?.full_name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <header
      className="
        sticky
        top-5
        z-40
        mx-5
        mt-5
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
          rounded-[30px]
          border
          border-[#EFE8F6]
          bg-gradient-to-r
          from-[#F8F2FC]
          to-[#FCFAFD]
          px-8
          py-6
          shadow-[0_15px_40px_rgba(120,80,180,0.08)]
        "
      >

        {/* ======================================= */}
        {/* LEFT */}
        {/* ======================================= */}

        <div>

          <h1
            className="
              text-3xl
              font-extrabold
              text-slate-900
            "
          >

            {pageTitle}

          </h1>

          <p
            className="
              mt-2
              text-sm
              font-medium
              text-slate-500
            "
          >

            {greeting},{" "}
            <span className="font-semibold text-violet-700">
              {firstName}
            </span>
            👋

          </p>

        </div>

        {/* ======================================= */}
        {/* RIGHT */}
        {/* ======================================= */}

        <div
          className="
            flex
            items-center
            gap-5
          "
        >

                  {/* ======================================= */}
          {/* SEARCH BAR */}
          {/* ======================================= */}

          <div className="relative hidden lg:block">

            <Search
              size={18}
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
              placeholder="Search candidates, jobs..."
              className="
                h-12
                w-[340px]
                rounded-2xl
                border
                border-[#EFE8F6]
                bg-[#F7F4FA]
                pl-12
                pr-4
                text-sm
                font-medium
                text-slate-700
                outline-none
                transition-all
                duration-300
                placeholder:text-slate-400
                focus:border-fuchsia-300
                focus:bg-white
                focus:ring-4
                focus:ring-fuchsia-100
              "
            />

          </div>

          {/* ======================================= */}
          {/* NOTIFICATION */}
          {/* ======================================= */}

          <button
            className="
              relative
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-[#EFE8F6]
              bg-[#F7F4FA]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-white
              hover:shadow-lg
            "
          >

            <Bell
              size={20}
              className="text-violet-600"
            />

            {/* Notification Dot */}

            <span
              className="
                absolute
                right-3
                top-3
                h-2.5
                w-2.5
                rounded-full
                bg-pink-500
                ring-2
                ring-[#FCFAFD]
              "
            />

          </button>

          {/* Divider */}

          <div className="h-10 w-px bg-[#EFE8F6]" />

          {/* ======================================= */}
          {/* USER PROFILE */}
          {/* ======================================= */}

          <button
            className="
              flex
              items-center
              gap-4
              rounded-2xl
              px-2
              py-2
              transition-all
              duration-300
              hover:bg-[#F7F4FA]
            "
          >

                        {/* Avatar */}

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-violet-600
                via-fuchsia-500
                to-pink-500
                shadow-md
              "
            >

              <span
                className="
                  text-sm
                  font-bold
                  tracking-wide
                  text-white
                "
              >

                {initials}

              </span>

            </div>

            {/* User Details */}

            <div className="hidden text-left md:block">

              <h3
                className="
                  text-[15px]
                  font-bold
                  text-slate-900
                "
              >

                {user?.full_name || "User"}

              </h3>

              <p
                className="
                  mt-0.5
                  text-xs
                  font-medium
                  capitalize
                  text-slate-500
                "
              >

                {user?.role || "Recruiter"}

              </p>

            </div>

            {/* Dropdown */}

            <ChevronDown
              size={18}
              className="
                text-slate-500
                transition-transform
                duration-300
              "
            />

          </button>

        </div>

      </div>
    </header>
  );
}