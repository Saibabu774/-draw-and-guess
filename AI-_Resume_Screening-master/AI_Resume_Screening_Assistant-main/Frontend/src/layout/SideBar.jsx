import { useState } from "react";
import { NavLink } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import {
  LayoutDashboard,
  Users,
  BriefcaseBusiness,
  Sparkles,
  ChevronDown,
  ChevronRight,
  FileSearch,
  BrainCircuit,
  ClipboardCheck,
  MessageSquareQuote,
  History,
  UserCog,
} from "lucide-react";

export default function Sidebar() {
  const [aiOpen, setAiOpen] = useState(true);
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

 

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      title: "Candidates",
      icon: Users,
      path: "/candidates",
    },
    {
      title: "Jobs",
      icon: BriefcaseBusiness,
      path: "/jobs",
    },
   
    {
      title: "Evaluation History",
      icon: History,
      path: "/evaluation-history",
    },
  ];

  const aiMenus = [
    
    {
      title: "Resume Matching",
      icon: BrainCircuit,
      path: "/resume-matching",
    },
    {
      title: "Candidate Summary",
      icon: ClipboardCheck,
      path: "/candidate-summary",
    },
    {
      title: "Interview Questions",
      icon: MessageSquareQuote,
      path: "/interview-questions",
    },
  ];

  return (
    <aside
      className="
        fixed
        left-5
        top-5
        bottom-5
        w-[300px]
        rounded-[32px]
        border
        border-[#EFE8F6]
        bg-gradient-to-b
        from-[#F8F2FC]
        via-[#FBF8FD]
        to-[#FDFBFE]
        shadow-[0_15px_40px_rgba(120,80,180,0.08)]
        flex
        flex-col
        z-50
      "
    >
      {/* ====================================== */}
      {/* Logo */}
      {/* ====================================== */}

      <div className="px-7 pt-7">

        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-[22px]
              bg-gradient-to-br
              from-violet-600
              via-fuchsia-500
              to-pink-500
              shadow-lg
            "
          >

            <span className="text-2xl font-black text-white">
              AI
            </span>

          </div>

          <div>

            <h2 className="text-2xl font-black text-slate-900">
              ResumeAI
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              AI Resume Screening
            </p>

          </div>

        </div>

      </div>

      {/* Divider */}

      <div className="mx-7 mt-7 border-t border-[#EFE8F6]" />

      {/* ====================================== */}
      {/* Navigation */}
      {/* ====================================== */}

      <div
        className="
          flex-1
          px-5
          py-6
        "
      >

        <div className="space-y-2">
                      {/* Main Menu */}

          {menuItems.slice(0, 3).map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `
                  group
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  px-5
                  py-4
                  transition-all
                  duration-300
                  ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-white shadow-[0_12px_30px_rgba(192,38,211,0.28)]"
                      : "text-slate-600 hover:bg-[#F6F1FB] hover:text-violet-700"
                  }
                `
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      size={21}
                      className={
                        isActive
                          ? "text-white"
                          : "text-violet-600"
                      }
                    />

                    <span className="text-[15px] font-semibold">
                      {item.title}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}

          {/* ====================================== */}
          {/* AI WORKSPACE */}
          {/* ====================================== */}

          <button
            onClick={() => setAiOpen(!aiOpen)}
            className="
              mt-3
              flex
              w-full
              items-center
              justify-between
              rounded-2xl
              px-5
              py-4
              text-slate-700
              transition-all
              duration-300
              hover:bg-[#F6F1FB]
            "
          >

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-violet-500
                  via-fuchsia-500
                  to-pink-500
                "
              >

                <Sparkles
                  size={18}
                  className="text-white"
                />

              </div>

              <span className="text-[15px] font-semibold">
                AI Workspace
              </span>

            </div>

            {aiOpen ? (
              <ChevronDown
                size={18}
                className="text-slate-500"
              />
            ) : (
              <ChevronRight
                size={18}
                className="text-slate-500"
              />
            )}

          </button>

          {/* AI Sub Menu */}

          {aiOpen && (

            <div className="ml-6 mt-2 space-y-2 border-l-2 border-[#EFE8F6] pl-5">

              {aiMenus.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.title}
                    to={item.path}
                    className={({ isActive }) =>
                      `
                      flex
                      items-center
                      gap-3
                      rounded-xl
                      px-4
                      py-3
                      transition-all
                      duration-300
                      ${
                        isActive
                          ? "bg-fuchsia-50 text-fuchsia-700"
                          : "text-slate-500 hover:bg-[#F8F4FC] hover:text-violet-700"
                      }
                    `
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          size={17}
                          className={
                            isActive
                              ? "text-fuchsia-600"
                              : "text-violet-500"
                          }
                        />

                        <span className="text-[14px] font-medium">
                          {item.title}
                        </span>
                      </>
                    )}
                  </NavLink>
                );
              })}

            </div>

          )}

          {/* Bottom Menu */}

          <div className="mt-4 space-y-2">

            {menuItems.slice(3).map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    group
                    flex
                    items-center
                    gap-4
                    rounded-2xl
                    px-5
                    py-4
                    transition-all
                    duration-300
                    ${
                      isActive
                        ? "bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 text-white shadow-[0_12px_30px_rgba(192,38,211,0.28)]"
                        : "text-slate-600 hover:bg-[#F6F1FB] hover:text-violet-700"
                    }
                  `
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={21}
                        className={
                          isActive
                            ? "text-white"
                            : "text-violet-600"
                        }
                      />

                      <span className="text-[15px] font-semibold">
                        {item.title}
                      </span>
                    </>
                  )}
                </NavLink>
              );
            })}

            <div className="mt-auto px-6 pb-6">

              <button
                onClick={handleLogout}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  border
                  border-red-200
                  bg-red-50
                  px-3
                  py-2
                  font-semibold
                  text-red-400
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:bg-red-500
                  hover:text-white
                  hover:shadow-lg
                "
              >

                <LogOut size={20} />

                Logout

              </button>

            </div>

           </div>

        </div>

      </div>

      
      
    </aside>
  );
}