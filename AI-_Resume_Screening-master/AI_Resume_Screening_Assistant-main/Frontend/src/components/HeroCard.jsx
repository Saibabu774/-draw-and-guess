import { BrainCircuit } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function HeroCard() {
  const { user } = useAuth();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  const firstName =
    user?.full_name?.split(" ")[0] || "User";

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[36px]
        bg-gradient-to-r
        from-violet-700
        via-fuchsia-600
        to-pink-500
        p-5
        shadow-[0_20px_50px_rgba(124,58,237,0.18)]
      "
    >
      {/* Decorative Glow */}

      

      

      <div
        className="
          relative
          z-10
          flex
          items-center
          justify-between
          gap-8
        "
      >
                {/* ====================================== */}
        {/* LEFT CONTENT */}
        {/* ====================================== */}

        <div className="max-w-3xl">

          {/* Greeting */}

          <div
            className="
              inline-flex
              items-center
              rounded-full
              border
              border-white/20
              bg-white/10
              px-5
              py-2.5
              backdrop-blur-md
            "
          >

            

          </div>

          {/* Heading */}

          <h1
            className="
              mt-7
              text-4xl
              font-black
              leading-tight
              tracking-tight
              text-white
            "
          >

            AI Resume Screening & Candidate Evaluation

          </h1>


        </div>

                
    </div>

      {/* Bottom Decorative Line */}

      <div
        className="
          absolute
          bottom-0
          left-0
          h-[4px]
          w-full
          bg-gradient-to-r
          from-white/0
          via-white/40
          to-white/0
        "
      />

    </div>
  );
}