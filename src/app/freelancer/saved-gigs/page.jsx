import { Spinner } from "@heroui/react";
import { FiBookmark } from "react-icons/fi";

const SavedGigs = () => {
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
