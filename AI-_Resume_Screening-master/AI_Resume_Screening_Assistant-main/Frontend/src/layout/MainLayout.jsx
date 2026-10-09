import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout({ children }) {
  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#F8F5FB]
      "
    >

      {/* ================================================= */}

      {/* BACKGROUND GLOW */}

      {/* ================================================= */}

      <div
        className="
          absolute
          -top-44
          -right-44
          h-[420px]
          w-[420px]
          rounded-full
          bg-fuchsia-300/20
          blur-[140px]
        "
      />

      <div
        className="
          absolute
          bottom-0
          -left-40
          h-[360px]
          w-[360px]
          rounded-full
          bg-violet-300/20
          blur-[140px]
        "
      />

      <div
        className="
          absolute
          top-1/3
          left-1/2
          h-[260px]
          w-[260px]
          rounded-full
          bg-pink-300/10
          blur-[120px]
        "
      />

      {/* ================================================= */}

      {/* SIDEBAR */}

      {/* ================================================= */}

      <Sidebar />

      {/* ================================================= */}

      {/* MAIN AREA */}

      {/* ================================================= */}

      <div
        className="
          relative
          ml-[330px]
          min-h-screen
          pr-5
          pb-5
          flex
          flex-col
        "
      >

        {/* Navbar */}

        <Navbar />

        {/* ================================================= */}

        {/* CONTENT */}

        {/* ================================================= */}

        <main
          className="
            relative
            flex-1
            mx-5
            mt-5
          "
        >

          <div
            className="
              relative
              min-h-[calc(100vh-150px)]
              rounded-[32px]
              border
              border-[#EFE8F6]
              bg-gradient-to-br
              from-[#FEFCFF]
              to-[#FBF9FD]
              shadow-[0_15px_40px_rgba(120,80,180,0.08)]
              overflow-hidden
            "
          >

            {/* Top Gradient Line */}

            <div
              className="
                absolute
                left-0
                top-0
                h-1
                w-full
                bg-gradient-to-r
                from-violet-600
                via-fuchsia-500
                to-pink-500
              "
            />

            {/* Page Content */}

            <div
              className="
                relative
                z-10
                p-8
                lg:p-10
              "
            >
                              {/* ====================================== */}
              {/* CONTENT BACKGROUND DECORATION */}
              {/* ====================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  overflow-hidden
                "
              >

                {/* Top Right Glow */}

                <div
                  className="
                    absolute
                    -right-24
                    -top-24
                    h-72
                    w-72
                    rounded-full
                    bg-fuchsia-200/20
                    blur-3xl
                  "
                />

                {/* Bottom Left Glow */}

                <div
                  className="
                    absolute
                    -bottom-24
                    -left-24
                    h-72
                    w-72
                    rounded-full
                    bg-violet-200/20
                    blur-3xl
                  "
                />

                {/* Center Glow */}

                <div
                  className="
                    absolute
                    left-1/2
                    top-1/2
                    h-60
                    w-60
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-pink-200/10
                    blur-3xl
                  "
                />

              </div>

              {/* ====================================== */}
              {/* PAGE CONTENT */}
              {/* ====================================== */}

              <div
                className="
                  relative
                  z-20
                  flex
                  min-h-full
                  flex-col
                "
              >

                {children}

              </div>

            </div>

          </div>

        </main>

        
    </div>

    </div>
  );
}