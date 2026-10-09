import { useEffect, useState } from "react";

import {
  Users,
  BriefcaseBusiness,
  BrainCircuit,
  Target,
  Clock3,
  Activity,
} from "lucide-react";

import API from "../services/api";

import StatsCard from "./StatsCard";

export default function StatsGrid() {

  const [dashboard, setDashboard] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  /*
  ============================================
  Load Dashboard
  ============================================
  */

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {

    try {

      const response =
        await API.get("/dashboard");

      setDashboard(response.data);

    } catch (error) {

      console.error(
        "Dashboard Error:",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  /*
  ============================================
  Loading
  ============================================
  */

  if (loading) {

    return (

      <div
        className="
          mt-8
          grid
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >

        {Array.from({ length: 6 }).map(
          (_, index) => (

            <div
              key={index}
              className="
                h-52
                animate-pulse
                rounded-[28px]
                border
                border-[#EFE8F6]
                bg-[#F7F4FA]
              "
            />

          )
        )}

      </div>

    );

  }

  /*
  ============================================
  Render
  ============================================
  */

  return (

    <div
      className="
        mt-8
        grid
        gap-6
        md:grid-cols-2
        xl:grid-cols-3
      "
    >

              <StatsCard
        title="Total Candidates"
        value={dashboard?.total_candidates ?? 0}
        subtitle="Registered candidates"
        icon={Users}
        color="violet"
      />

      <StatsCard
        title="Active Jobs"
        value={dashboard?.total_jobs ?? 0}
        subtitle="Available job openings"
        icon={BriefcaseBusiness}
        color="pink"
      />

      <StatsCard
        title="Resume Analysis"
        value={dashboard?.total_resume_analysis ?? 0}
        subtitle="AI processed resumes"
        icon={BrainCircuit}
        color="blue"
      />

            <StatsCard
        title="Average Match"
        value={`${dashboard?.average_match_score ?? 0}%`}
        subtitle="AI matching accuracy"
        icon={Target}
        color="emerald"
      />

      <StatsCard
        title="Recent Candidates"
        value={dashboard?.recent_candidates ?? 0}
        subtitle="Added recently"
        icon={Clock3}
        color="amber"
      />

      <StatsCard
        title="AI Status"
        value="Online"
        subtitle="Gemini AI connected"
        icon={Activity}
        color="violet"
      />

    </div>

  );
}