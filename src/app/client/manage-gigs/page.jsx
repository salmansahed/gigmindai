export const metadata = {
  title: "Manage Gigs",
};

import { serverUserSession } from "@/lib/serverUserSession";
import ManageGigsTable from "./ManageGigsTable";
import { getServerJWTToken } from "@/lib/getServerJWTToken";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FiHome, FiLock } from "react-icons/fi";

const ManageGigsPage = async () => {
  const session = await serverUserSession();
  const authorId = session?.user?.id;

  const userRole = session?.user?.role;
  if (userRole !== "client") {
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
            Client Only Area
          </h1>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-8">
            This page is strictly reserved for{" "}
            <span className="text-cyan-400 font-semibold">Clients</span>. Please
            switch to a Client account to post or manage jobs.
          </p>

          {/* Action Button */}
          <Link href="/">
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

  const token = await getServerJWTToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/my-gigs/${authorId}`,
    {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const initialJobs = await res.json();

  return (
    <div className="px-4 min-h-screen pt-28 pb-12 bg-black">
      <ManageGigsTable authorId={authorId} initialJobs={initialJobs} />
    </div>
  );
};

export default ManageGigsPage;
