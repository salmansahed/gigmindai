export const metadata = {
  title: 'Not Found',
}



import { Card, Button } from "@heroui/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white flex items-center justify-center overflow-hidden relative font-sans p-6 selection:bg-[#00e599]/30">
      {/* Background ambient glowing lights */}
      <div className="absolute top-[20%] left-[-10%] w-100 h-100 bg-[#00e599]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-100 h-100 bg-[#3b82f6]/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glassmorphic 404 Container */}
      <Card className="max-w-xl w-full bg-white/3 backdrop-blur-md border border-white/8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
        {/* Animated Neon Agentic Indicator */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#00e599] bg-[#00e599]/10 border border-[#00e599]/20 px-4 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e599] animate-ping" />
            System Routing Exception
          </span>
        </div>

        {/* Big Neon 404 Header */}
        <h1 className="text-7xl md:text-8xl font-black tracking-tighter mb-4 bg-linear-to-b from-white to-slate-500 bg-clip-text text-transparent">
          404
        </h1>

        {/* Error Context Title */}
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight">
          Requested Route Not Found
        </h2>

        {/* Description mapped perfectly to GigMindAi domain */}
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed mb-8 max-w-sm mx-auto">
          The requested pipeline node or workspace path does not exist within
          the GigMindAi execution matrix. The autonomous routing agent was
          unable to resolve this request.
        </p>

        {/* Interactive Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link href="/" className="w-full sm:w-auto">
            <Button className="w-full bg-[#00e599] hover:bg-[#00c885] text-[#0a0f1d] font-bold rounded-xl text-xs px-6 shadow-[0_0_20px_rgba(0,229,153,0.2)] transition-all">
              Return to Home
            </Button>
          </Link>

          <Link href="/explore-jobs" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full border-white/20 hover:border-white/40 text-white font-semibold rounded-xl text-xs px-6 transition-all"
            >
              Browse Active Talents
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
