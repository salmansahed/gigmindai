import Link from "next/link";
import { Button } from "@heroui/react";
import { FiArrowRight, FiZap, FiUsers, FiCheckCircle } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import HeroMatchCard from "./HeroMatchCard";

const FEATURE_PILLS = [
  {
    icon: <FiZap className="w-3 h-3 text-cyan-400" />,
    text: "Instant AI Resume Scan",
  },
  {
    icon: <FiUsers className="w-3 h-3 text-emerald-400" />,
    text: "10k+ Verified Freelancers",
  },
  {
    icon: <FiCheckCircle className="w-3 h-3 text-emerald-400" />,
    text: "99% Match Accuracy",
  },
];

export default function Hero() {
  return (
    <section className="relative h-[65vh] min-h-130 w-full overflow-hidden bg-[#0a0f1d] flex items-center">
      {/* Background ambient glow orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div className="absolute -top-32 -left-32 w-125 h-125 rounded-full bg-emerald-500/8 blur-[120px]" />
        <div className="absolute -top-16 right-0 w-100 h-100 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-200 h-48 rounded-full bg-[#06b6d4]/5 blur-[80px]" />
        <svg
          className="absolute inset-0 w-full h-full opacity-18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </div>

      {/* Content grid */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7 flex flex-col gap-5">
          <div className="inline-flex w-fit items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <HiSparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-cyan-200/80">
              Next-Gen Cognitive Talent Matching
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.1] tracking-tight text-white">
            Hire Top Freelance Talents{" "}
            <span className="block mt-1">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-emerald-300 to-cyan-300 drop-shadow-[0_2px_16px_rgba(16,185,129,0.25)]">
                with AI Power
              </span>
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-lg leading-relaxed">
            Connect with elite developers, visionary designers, and expert
            technical writers. Our cognitive engine scans resumes and
            match-checks scores instantly to guarantee project success.
          </p>

          <ul className="flex flex-wrap gap-2" aria-label="Platform highlights">
            {FEATURE_PILLS.map(({ icon, text }) => (
              <li
                key={text}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/8 bg-white/4 text-[11px] font-medium text-slate-300"
              >
                {icon}
                {text}
              </li>
            ))}
          </ul>

          {/* CTA Buttons  */}
          <div className="flex flex-wrap gap-3 mt-1">
            <Link
              href="/explore-jobs"
              className="inline-block"
              aria-label="Browse available freelance job listings"
            >
              <Button className="group relative px-7 py-6 rounded-xl text-sm font-black uppercase tracking-wider text-[#0a0f1d] bg-linear-to-r from-emerald-500 to-emerald-400 shadow-[0_0_0_0_rgba(16,185,129,0.4)] hover:shadow-[0_0_28px_6px_rgba(16,185,129,0.35)] hover:-translate-y-0.5 active:scale-95 transition-all duration-200 overflow-hidden">
                <span
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 ease-in-out"
                  aria-hidden="true"
                />
                <span className="relative">Explore Jobs</span>
                <FiArrowRight className="relative w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
              </Button>
            </Link>

            <Link
              href="#how-it-works"
              className="inline-block"
              aria-label="Learn how GigMind AI works"
            >
              <Button className="inline-flex items-center gap-2 px-7 py-6 rounded-xl text-sm font-semibold tracking-wide text-white border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/8 active:scale-95 transition-all duration-200">
                How it Works
              </Button>
            </Link>
          </div>
        </div>

        <div className="hidden md:col-span-5 md:flex justify-center items-center relative">
          <div
            aria-hidden="true"
            className="absolute w-72 h-72 rounded-full bg-cyan-500/8 blur-3xl"
          />
          <HeroMatchCard />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-[#0a0f1d] to-transparent z-10"
      />
    </section>
  );
}
