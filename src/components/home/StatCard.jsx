import { Card } from "@heroui/react";

export default function StatCard({ stat }) {
  return (
    <Card
      as="article"
      aria-label={`${stat.label}: ${stat.value}`}
      className={`
        relative flex flex-col gap-5 rounded-2xl overflow-hidden
        bg-white/3 backdrop-blur-xl
        border border-white/8 ${stat.borderAccent}
        shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)]
        hover:bg-white/5
        group
      `}
    >
      <div className="p-6 flex flex-col gap-5">
        {/* Corner glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: stat.glowColor }}
        />

        {/* Top row: icon badge + trend pill */}
        <div className="flex items-start justify-between">
          <span
            className={`flex-none p-3 rounded-xl ${stat.iconBg} ${stat.iconColor} group-hover:scale-110 transition-transform duration-300`}
          >
            {stat.icon}
          </span>

          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                       ${
                         stat.trendUp
                           ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/15"
                           : "text-red-400 bg-red-500/10 border border-red-500/15"
                       }`}
          >
            {stat.trendUp ? "↑" : "↓"}
            {stat.trend}
          </span>
        </div>

        {/* Primary metric */}
        <div>
          <p className="text-4xl font-black tracking-tight text-white leading-none mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-linear-to-r group-hover:from-white group-hover:to-slate-300 transition-all duration-300">
            {stat.value}
          </p>
          <p className="text-sm font-semibold text-slate-200">{stat.label}</p>
          <p className="text-[11px] text-slate-500 mt-1 leading-snug">
            {stat.sub}
          </p>
        </div>

        {/* Progress bar */}
        <div aria-hidden="true">
          <div className="w-full h-1 rounded-full bg-white/6 overflow-hidden">
            <div
              className={`h-full rounded-full ${stat.barColor} ${stat.barWidth} shadow-[0_0_8px_currentColor] transition-all duration-700`}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
