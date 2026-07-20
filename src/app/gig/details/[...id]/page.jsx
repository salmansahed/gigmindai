export const metadata = {
  title: "Gig Details",
};

import Image from "next/image";
import {
  FiDollarSign,
  FiClock,
  FiTag,
  FiBriefcase,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";
import ActionsButtons from "./ActionsButtons";

export default async function JobDetails({ params }) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs/${id}`,
  );
  const job = await res.json();
  return (
    <main className="min-h-screen bg-[#060a13] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* ─── 1. Cover Image Banner ─────────────────────────────────────── */}
        <div className="relative h-60 sm:h-80 w-full rounded-2xl overflow-hidden border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
          <Image
            src={
              job?.coverImage ||
              "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80"
            }
            alt={job?.title}
            fill
            priority
            className="object-cover"
          />
          {/* Frosted glass overlay backdrop */}
          <div className="absolute inset-0 bg-linear-to-t from-[#060a13] via-[#060a13]/40 to-transparent" />

          {/* Category badge floating on top */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 backdrop-blur-md border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
            <FiTag className="w-3.5 h-3.5" />
            {job?.category}
          </div>
        </div>

        {/* ─── 2. Main Content Layout (Grid) ────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Side: Title, Description, Skills & Deliverables */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Job Title and Location */}
            <div className="flex flex-col gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-white via-slate-200 to-slate-400">
                {job?.title}
              </h1>
              <div className="flex items-center gap-1.5 text-sm text-slate-400">
                <FiMapPin className="text-cyan-400 shrink-0" />
                <span>{job?.address}</span>
              </div>
            </div>

            <hr className="border-white/10" />

            {/* Job Description Section */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold text-slate-200">
                Job Description
              </h3>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-light whitespace-pre-line">
                {job?.description}
              </p>
            </div>

            {/* Required Skills Section */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold text-slate-200">
                Required Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {job?.skills?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-300 hover:border-cyan-500/40 hover:text-white transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Deliverables Section */}
            <div className="flex flex-col gap-3">
              <h3 className="text-lg font-bold text-slate-200">
                Project Deliverables
              </h3>
              <ul className="flex flex-col gap-2.5" role="list">
                {job?.deliverables?.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2.5 text-sm text-slate-400"
                  >
                    <FiCheckCircle className="text-emerald-400 w-4 h-4 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: Sidebar Sticky Card (Budget, Time, CTA Buttons) */}
          <div className="flex flex-col gap-5 p-6 rounded-2xl bg-[#0a0f1d]/60 backdrop-blur-2xl border border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] sticky top-24">
            <h3 className="text-md font-bold text-slate-300 tracking-wide uppercase border-b border-white/10 pb-3">
              Gig Summary
            </h3>

            {/* Budget Display */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <FiDollarSign className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-medium">
                  Budget
                </span>
                <span className="text-xl font-black text-white">
                  ${job?.budget}
                </span>
              </div>
            </div>

            {/* Delivery Time Display */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                <FiClock className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-medium">
                  Delivery Time
                </span>
                <span className="text-sm font-semibold text-slate-200">
                  {job?.deliveryTime}
                </span>
              </div>
            </div>

            {/* Job Type Display */}
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                <FiBriefcase className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400 font-medium">
                  Job Type
                </span>
                <span className="text-sm font-semibold text-slate-200">
                  {job?.jobType}
                </span>
              </div>
            </div>

            <div className="my-1 border-t border-white/6" />

            {/* Action Buttons */}
            <ActionsButtons />
          </div>
        </div>
      </div>
    </main>
  );
}
