"use client";

import { Button } from "@heroui/react";
import { useEffect } from "react";
import { FiAlertTriangle, FiHome, FiRefreshCw } from "react-icons/fi";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("Uncaught App Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] px-4 py-12 bg-[#0a0f1d]">
      {/* Glassmorphism Card Container */}
      <div className="max-w-md w-full flex flex-col items-center text-center p-8 md:p-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl shadow-[#06b6d4]/5 relative overflow-hidden">
        {/* Glowing Background Accent */}
        <div className="absolute -top-12 -right-12 size-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 size-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Warning Icon Container */}
        <div className="p-4 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-rose-400 mb-6 shadow-inner">
          <FiAlertTriangle className="size-10 md:size-12 animate-pulse" />
        </div>

        {/* Heading & Details */}
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2">
          Something went wrong!
        </h1>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-6">
          An unexpected error occurred while rendering this page. Don&apos;t
          worry, it&apos;s not your fault!
        </p>

        {/* Error Code/Message Snippet */}
        {error?.message && (
          <div className="w-full bg-black/30 border border-white/5 rounded-xl p-3 mb-8 text-left overflow-x-auto">
            <p className="text-[11px] font-mono text-rose-300/80 wrap-break-word line-clamp-2">
              {error.message}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Button
            variant="secondary"
            className="w-full h-11 text-xs font-bold uppercase tracking-wider text-[#0a0f1d] bg-linear-to-r from-emerald-400 to-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] rounded-xl transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            onPress={() => reset()}
          >
            <FiRefreshCw className="size-4" /> Try Again
          </Button>

          <Link href="/">
            <Button
              variant="outline"
              className="w-full h-11 text-xs font-bold uppercase tracking-wider text-white border border-white/10 bg-transparent hover:bg-white/10 rounded-xl transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <FiHome className="size-4" /> Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
