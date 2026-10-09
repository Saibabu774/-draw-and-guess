import { ArrowUpRight } from "lucide-react";

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "violet",
}) {

  const colorStyles = {
    violet: {
      iconBg:
        "bg-gradient-to-br from-violet-600 to-fuchsia-500",
      badge:
        "bg-violet-50 text-violet-700",
      ring:
        "group-hover:ring-violet-200",
    },

    pink: {
      iconBg:
        "bg-gradient-to-br from-pink-500 to-fuchsia-500",
      badge:
        "bg-pink-50 text-pink-700",
      ring:
        "group-hover:ring-pink-200",
    },

    emerald: {
      iconBg:
        "bg-gradient-to-br from-emerald-500 to-green-500",
      badge:
        "bg-emerald-50 text-emerald-700",
      ring:
        "group-hover:ring-emerald-200",
    },

    amber: {
      iconBg:
        "bg-gradient-to-br from-amber-500 to-orange-500",
      badge:
        "bg-amber-50 text-amber-700",
      ring:
        "group-hover:ring-amber-200",
    },

    blue: {
      iconBg:
        "bg-gradient-to-br from-sky-500 to-blue-600",
      badge:
        "bg-sky-50 text-sky-700",
      ring:
        "group-hover:ring-sky-200",
    },
  };

  const currentColor =
    colorStyles[color] || colorStyles.violet;

  return (

    <div
      className={`
        group
        relative
        overflow-hidden
        rounded-[28px]
        border
        border-[#EFE8F6]
        bg-[#FCFAFD]
        p-6
        shadow-[0_10px_30px_rgba(120,80,180,0.06)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_18px_45px_rgba(120,80,180,0.12)]
        hover:ring-2
        ${currentColor.ring}
      `}
    >

              {/* Decorative Glow */}

      <div
        className="
          absolute
          -right-10
          -top-10
          h-24
          w-24
          rounded-full
          bg-fuchsia-200/20
          blur-3xl
          transition-all
          duration-300
          group-hover:scale-125
        "
      />

      {/* ====================================== */}
      {/* HEADER */}
      {/* ====================================== */}

      <div className="relative z-10 flex items-start justify-between">

        {/* Left */}

        <div>

          <div
            className={`
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              text-white
              shadow-lg
              ${currentColor.iconBg}
            `}
          >

            <Icon size={28} />

          </div>

        </div>

        {/* Growth Badge */}

        <div
          className={`
            flex
            items-center
            gap-1
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${currentColor.badge}
          `}
        >

          <ArrowUpRight size={14} />

          Active

        </div>

      </div>

      {/* ====================================== */}
      {/* CONTENT */}
      {/* ====================================== */}

      <div className="relative z-10 mt-7">

                {/* Value */}

        <h2
          className="
            text-4xl
            font-black
            tracking-tight
            text-slate-900
          "
        >

          {value}

        </h2>

        {/* Title */}

        <h4
          className="
            mt-3
            text-base
            font-bold
            text-slate-700
          "
        >

          {title}

        </h4>

        {/* Subtitle */}

        <p
          className="
            mt-2
            text-sm
            leading-6
            text-slate-500
          "
        >

          {subtitle}

        </p>

      </div>

      {/* ====================================== */}
      {/* BOTTOM ACCENT */}
      {/* ====================================== */}

      <div
        className="
          relative
          z-10
          mt-6
          h-1
          w-16
          rounded-full
          bg-gradient-to-r
          from-violet-500
          via-fuchsia-500
          to-pink-500
          transition-all
          duration-300
          group-hover:w-24
        "
      />

    </div>
  );
}


      