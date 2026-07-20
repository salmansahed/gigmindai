export const metadata = {
  title: "Explore Jobs",
};

import { Suspense } from "react";
import { Card } from "@heroui/react";
import JobCard from "../../components/explore-jobs/JobCard";
import ExploreJobsControls from "../../components/explore-jobs/ExploreJobsControls";
import PaginationWithSummary from "../../components/reusable-pagination/PaginationWithSummary";

// ── 🔄 1. SKELETON LOADER (SUSPENSE FALLBACK) ──
const JobsGridSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {[1, 2, 3, 4].map((n) => (
      <Card
        key={`skeleton-${n}`}
        className="bg-white/3 backdrop-blur-md border border-white/8 rounded-2xl p-4 h-105 flex flex-col animate-pulse"
      >
        <div className="w-full h-40 bg-white/5 rounded-xl mb-4" />
        <div className="w-3/4 h-5 bg-white/5 rounded mb-3" />
        <div className="w-full h-12 bg-white/5 rounded mb-4" />
        <div className="flex gap-2 mb-4">
          <div className="w-16 h-5 bg-white/5 rounded-full" />
          <div className="w-16 h-5 bg-white/5 rounded-full" />
        </div>
        <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
          <div className="w-16 h-6 bg-white/5 rounded" />
          <div className="w-24 h-8 bg-white/5 rounded-lg" />
        </div>
      </Card>
    ))}
  </div>
);

// ── 🌐 2. SERVER-SIDE DATA FETCHING FUNCTION ──
async function getJobs(resolvedParams) {
  const searchTerm = resolvedParams.search || "";
  const categoryFilter = resolvedParams.category || "All";
  const typeFilter = resolvedParams.type || "All";
  const sortBy = resolvedParams.sort || "Latest";
  const currentPage = parseInt(resolvedParams.page) || 1;
  const itemsPerPage = 8;

  let mappedSort = "latest";
  if (sortBy === "Price (High to Low)") mappedSort = "price-high";
  if (sortBy === "Price (Low to High)") mappedSort = "price-low";

  const queryParams = new URLSearchParams({
    search: searchTerm,
    category: categoryFilter,
    type: typeFilter,
    sort: mappedSort,
    page: currentPage.toString(),
    limit: itemsPerPage.toString(),
  });

  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/jobs?${queryParams.toString()}`;

  try {
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok)
      return {
        jobs: [],
        meta: { totalPages: 1, currentPage: 1, totalJobs: 0 },
      };
    return await response.json();
  } catch (error) {
    console.error("❌ Server Fetch Error:", error);
    return { jobs: [], meta: { totalPages: 1, currentPage: 1, totalJobs: 0 } };
  }
}

// ── 📦 3. SEPARATE JOBS GRID COMPONENT ──
async function JobsGrid({ resolvedParams }) {
  const data = await getJobs(resolvedParams);
  const jobs = data.jobs || [];
  const currentPage = data.meta?.currentPage || 1;
  const totalJobs = data.meta?.totalJobs || 0;
  const itemsPerPage = 8;

  return (
    <>
      {jobs.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {jobs.map((job) => (
            <JobCard key={`job-${job._id}`} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/3 border border-white/5 rounded-2xl backdrop-blur-md">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-bold text-white mb-2">
            No Matching Data Found
          </h3>
          <p className="text-sm text-slate-400">
            Try adjusting your search terms or filters.
          </p>
        </div>
      )}

      {/* ── 📑 INTEGRATING YOUR CUSTOM REUSABLE PAGINATION ── */}
      {totalJobs > itemsPerPage && (
        <div className="mt-12">
          <PaginationWithSummary
            totalItems={totalJobs}
            page={currentPage}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}
    </>
  );
}

// ── 🌐 4. MAIN EXPLORE JOBS PAGE ──
export default async function ExploreJobs({ searchParams }) {
  const resolvedParams = await searchParams;

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white overflow-hidden relative font-sans pt-28 pb-16 selection:bg-[#00e599]/30">
      <div className="absolute top-[10%] left-[-5%] w-100 h-100 bg-[#00e599]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-350 mx-auto px-6 relative z-10">
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3 text-white">
            Explore Active Talents
          </h1>
          <p className="text-sm text-slate-400">
            Discover and hire top-tier developers and AI engineers for your next
            big project.
          </p>
        </div>

        {/* Client Filter Controls */}
        <ExploreJobsControls />

        {/* ── 🔄 SUSPENSE BOUNDARY WITH MOUNTED KEY ── */}
        <Suspense
          key={JSON.stringify(resolvedParams)}
          fallback={<JobsGridSkeleton />}
        >
          <JobsGrid resolvedParams={resolvedParams} />
        </Suspense>
      </div>
    </div>
  );
}
