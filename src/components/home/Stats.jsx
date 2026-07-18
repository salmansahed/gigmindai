import {
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
  FiBriefcase,
} from "react-icons/fi";
import SparklineChart from "./SparklineChart";
import StatCard from "./StatCard";

const STATS = [
  {
    id: "freelancers",
    value: "10k+",
    label: "Active Freelancers",
    sub: "Verified expert profiles onboarded globally",
    trend: "+18% this month",
    trendUp: true,
    icon: <FiUsers className="w-5 h-5" />,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    glowColor: "rgba(16,185,129,0.08)",
    borderAccent: "border-emerald-500/15",
    barColor: "bg-gradient-to-r from-emerald-500 to-emerald-400",
    barWidth: "w-[82%]",
  },
  {
    id: "earnings",
    value: "$5M+",
    label: "Freelancer Earnings",
    sub: "Total paid out across all active contracts",
    trend: "+45% this quarter",
    trendUp: true,
    icon: <FiDollarSign className="w-5 h-5" />,
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    glowColor: "rgba(6,182,212,0.08)",
    borderAccent: "border-cyan-500/15",
    barColor: "bg-gradient-to-r from-cyan-500 to-cyan-400",
    barWidth: "w-[75%]",
  },
  {
    id: "accuracy",
    value: "99.2%",
    label: "AI Match Accuracy",
    sub: "Cognitive engine precision score across all placements",
    trend: "+2.1% vs last quarter",
    trendUp: true,
    icon: <FiTrendingUp className="w-5 h-5" />,
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-400",
    glowColor: "rgba(99,102,241,0.08)",
    borderAccent: "border-indigo-500/15",
    barColor: "bg-gradient-to-r from-indigo-500 to-indigo-400",
    barWidth: "w-[94%]",
  },
  {
    id: "gigs",
    value: "3,200+",
    label: "Gigs Completed",
    sub: "Successfully closed contracts with milestone escrow",
    trend: "+60 this week",
    trendUp: true,
    icon: <FiBriefcase className="w-5 h-5" />,
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-400",
    glowColor: "rgba(236,72,153,0.08)",
    borderAccent: "border-pink-500/15",
    barColor: "bg-gradient-to-r from-pink-500 to-pink-400",
    barWidth: "w-[68%]",
  },
];

export default function Stats() {
  return (
    <section
      id="stats"
      aria-labelledby="stats-heading"
      className="relative py-24 border-y border-white/5 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <header className="text-center mb-14">
          <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-400/70 mb-3">
            By the Numbers
          </p>
          <h2
            id="stats-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 tracking-tight"
          >
            Validated Platform Growth
          </h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
            GigMind AI operates with military-grade match checks, ensuring
            real-time growth for developers worldwide.
          </p>
        </header>

        {/* ── 4-column stat cards grid ───────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {STATS.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

        {/* ── Full-width sparkline chart ──────────────────────────────────── */}
        <div className="grid grid-cols-1">
          <SparklineChart />
        </div>
      </div>
    </section>
  );
}
