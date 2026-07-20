export const metadata = {
  title: "Saved Gigs",
};

import { serverUserSession } from "@/lib/serverUserSession";
import { Button, Spinner } from "@heroui/react";
import Link from "next/link";
import { FiBookmark, FiHome, FiLock } from "react-icons/fi";

const SavedGigs = async () => {
  const session = await serverUserSession();
  const userRole = session?.user?.role;

  if (userRole !== "freelancer") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 py-12 bg-[#0a0f1d]">
        {/* Glassmorphism Card Container */}
        <div className="max-w-md w-full flex flex-col items-center text-center p-8 md:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-[#06b6d4]/5 relative overflow-hidden">
          {/* Glow Highlights */}
          <div className="absolute -top-12 -right-12 size-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 size-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

          {/* Lock Icon */}
          <div className="p-4 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-amber-400 mb-6 shadow-inner">
            <FiLock className="size-10 md:size-12 animate-pulse" />
          </div>

          {/* Badge */}
          <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-full mb-3">
            Restricted Access
          </span>

          {/* Heading & Details */}
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2">
            Freelancer Only Area
          </h1>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-8">
            This page is strictly reserved for{" "}
            <span className="text-cyan-400 font-semibold">Freelancers</span>.
            Please switch to a Freelancer account to access this dashboard.
          </p>

          {/* Action Button wrapped with Next.js Link */}
          <Link href="/" className="w-full">
            <Button
              variant="secondary"
              className="w-full h-12 text-xs font-bold uppercase tracking-wider text-[#0a0f1d] bg-linear-to-r from-emerald-400 to-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] rounded-xl transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <FiHome className="size-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 bg-[#0a0f1d]">
      <div className="max-w-md w-full border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center shadow-2xl">
        {/* Icon/Visual */}
        <div className="inline-flex p-4 bg-emerald-500/10 rounded-2xl mb-6">
          <FiBookmark className="size-10 text-emerald-400" />
        </div>

        {/* Text Content */}
        <div className="space-y-2 mb-8">
          <h2 className="text-2xl font-bold text-white">Saved Gigs</h2>
          <p className="text-slate-400 text-sm">
            Your saved jobs will appear here soon. We are polishing this feature
            to make your job search easier!
          </p>
        </div>

        {/* Loading Indicator */}
        <div className="flex items-center justify-center gap-3 text-cyan-400">
          <Spinner color="current" size="sm" />
          <span className="text-xs font-semibold uppercase tracking-widest">
            Preparing your dashboard...
          </span>
        </div>
      </div>
    </div>
  );
};

export default SavedGigs;
