"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Card } from "@heroui/react";

export default function ExploreJobsControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read current filter values from URL
  const searchTerm = searchParams.get("search") || "";
  const categoryFilter = searchParams.get("category") || "All";
  const typeFilter = searchParams.get("type") || "All";
  const sortBy = searchParams.get("sort") || "Latest";

  // Helper function to update URL query parameters
  const updateQueryParams = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "All" && value !== "Latest") {
      params.set(key, value);
    } else {
      params.delete(key); // Remove default values to keep URL clean
    }

    // Reset page number to 1 when filters change
    if (key !== "page") {
      params.delete("page");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Card className="bg-white/3 backdrop-blur-md border border-white/8 shadow-lg rounded-2xl p-5 mb-10 flex flex-col md:flex-row gap-4 justify-between items-center">
      {/* Search Input */}
      <div className="w-full md:w-1/3">
        <input
          type="text"
          placeholder="Search roles or skills..."
          defaultValue={searchTerm}
          onChange={(e) => updateQueryParams("search", e.target.value)}
          className="w-full bg-[#0a0f1d]/50 border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#00e599]/50 transition-colors"
        />
      </div>

      {/* Filter Dropdowns */}
      <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
        <select
          value={categoryFilter}
          onChange={(e) => updateQueryParams("category", e.target.value)}
          className="bg-[#0a0f1d]/50 border border-white/10 text-slate-300 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#00e599]/50 appearance-none cursor-pointer"
        >
          <option value="All">All Categories</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Full Stack">Full Stack</option>
          <option value="AI & ML">AI & ML</option>
          <option value="Design">Design</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => updateQueryParams("type", e.target.value)}
          className="bg-[#0a0f1d]/50 border border-white/10 text-slate-300 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#00e599]/50 appearance-none cursor-pointer"
        >
          <option value="All">Job Type (All)</option>
          <option value="Fixed">Fixed</option>
          <option value="Hourly">Hourly</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => updateQueryParams("sort", e.target.value)}
          className="bg-[#0a0f1d]/50 border border-white/10 text-slate-300 text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#00e599]/50 appearance-none cursor-pointer"
        >
          <option value="Latest">Sort: Latest</option>
          <option value="Price (High to Low)">Price (High to Low)</option>
          <option value="Price (Low to High)">Price (Low to High)</option>
        </select>
      </div>
    </Card>
  );
}
