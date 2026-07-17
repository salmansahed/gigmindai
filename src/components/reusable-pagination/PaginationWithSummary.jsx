"use client";

import { Pagination } from "@heroui/react";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function PaginationWithSummary({
  totalItems,
  page,
  itemsPerPage = 10,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Handle URL updates on page change
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    params.set("size", itemsPerPage.toString());

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Generate page numbers with ellipsis (...)
  const getPageNumbers = () => {
    const pages = [];
    pages.push(1);

    if (page > 3) {
      pages.push("ellipsis");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  // Calculate summary items range
  const startItem = totalItems === 0 ? 0 : (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);

  return (
    <Pagination className="w-full flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-white/5 dark:bg-neutral-900/40 backdrop-blur-md rounded-2xl border border-white/10 dark:border-neutral-800/60 shadow-xs">
      {/* Summary Section */}
      <Pagination.Summary className="text-xs font-semibold text-slate-400 dark:text-neutral-400">
        Showing{" "}
        <span className="font-bold text-white">
          {startItem}-{endItem}
        </span>{" "}
        of <span className="font-bold text-white">{totalItems}</span> results
      </Pagination.Summary>

      {/* Navigation Controls */}
      <Pagination.Content className="flex items-center gap-1.5 bg-[#0a0f1d]/50 p-1.5 rounded-xl border border-white/10">
        {/* Previous Button */}
        <Pagination.Item>
          <Pagination.Previous
            isDisabled={page === 1}
            onPress={() => handlePageChange(page - 1)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-white/5 rounded-lg cursor-pointer"
          >
            <FiChevronLeft className="size-4" />
            <span>Previous</span>
          </Pagination.Previous>
        </Pagination.Item>

        {/* Page Numbers */}
        {getPageNumbers().map((p, i) =>
          p === "ellipsis" ? (
            <Pagination.Item key={`ellipsis-${i}`}>
              <Pagination.Ellipsis className="px-2.5 py-1.5 text-xs text-slate-500" />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={p}>
              <Pagination.Link
                isActive={p === page}
                onPress={() => handlePageChange(p)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  p === page
                    ? "bg-[#00e599] text-[#0a0f1d] shadow-sm scale-105"
                    : "text-slate-400 hover:bg-white/5"
                }`}
              >
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ),
        )}

        {/* Next Button */}
        <Pagination.Item>
          <Pagination.Next
            isDisabled={page === totalPages}
            onPress={() => handlePageChange(page + 1)}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-300 hover:bg-white/5 rounded-lg cursor-pointer"
          >
            <span>Next</span>
            <FiChevronRight className="size-4" />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
  );
}
