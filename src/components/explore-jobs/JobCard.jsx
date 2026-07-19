import { Card, Button } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function JobCard({ job }) {
  return (
    <Card className="bg-white/3 backdrop-blur-md border border-white/8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl overflow-hidden flex flex-col h-105 transition-all hover:border-[#00e599]/30 hover:-translate-y-1 group">
      {/* ── Image Section ── */}
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={job.image}
          alt={job.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority={false}
        />
      </div>

      {/* ── Content Section ── */}
      <div className="py-5 px-1 flex flex-col grow">
        <h3 className="text-base font-bold text-white mb-1 line-clamp-1">
          {job.title}
        </h3>
        <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">
          {job.description}
        </p>

        {/* Meta Tags */}
        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          <span className="text-[9px] font-bold uppercase tracking-wider bg-white/5 border border-white/10 text-slate-300 px-2 py-1 rounded-md">
            {job.category}
          </span>
          <span className="text-[9px] font-bold uppercase tracking-wider bg-[#00e599]/10 border border-[#00e599]/20 text-[#00e599] px-2 py-1 rounded-md">
            {job.jobType}
          </span>
        </div>

        {/* Footer Info & Action */}
        <div className="pt-4 border-t border-white/5 flex justify-between items-center mt-auto">
          <div>
            <p className="text-xs text-slate-500">Starting at</p>
            <p className="text-sm font-black text-white">
              ${job.budget}
              {job.jobType === "Hourly Rate" ? "/hr" : ""}
            </p>
          </div>
          <Link href={`/gig/details/${job._id}`}>
            <Button className="bg-white/5 hover:bg-[#00e599] hover:text-[#0a0f1d] text-white border border-white/10 hover:border-[#00e599] font-bold rounded-lg text-xs px-4 py-2 transition-all">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
