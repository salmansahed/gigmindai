import { Card, Spinner } from "@heroui/react";
import { FiCode } from "react-icons/fi";

const MyApplications = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-6 bg-[#0a0f1d]">
      <Card className="max-w-md w-full border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl p-8 text-center">
        <div className="flex flex-col items-center gap-6">
          {/* Icon/Visual */}
          <div className="p-4 bg-emerald-500/10 rounded-2xl">
            <FiCode className="size-10 text-emerald-400" />
          </div>

          {/* Text Content */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">
              Feature in Progress
            </h2>
            <p className="text-slate-400 text-sm">
              We are working hard to build this dashboard for you. The
              application tracking system will be live very soon!
            </p>
          </div>

          {/* Loading Indicator */}
          <div className="flex items-center gap-3 text-cyan-400">
            <Spinner color="current" size="sm" />
            <span className="text-xs font-semibold uppercase tracking-widest">
              Building under the hood...
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MyApplications;
