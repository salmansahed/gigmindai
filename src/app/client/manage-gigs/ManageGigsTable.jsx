"use client";

import { useQuery } from "@tanstack/react-query";
import { Button, Table } from "@heroui/react";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
import { FiFolderPlus, FiPlus } from "react-icons/fi";
import DeleteGigModal from "./DeleteGigModal";
import { getClientJWTToken } from "@/lib/getClientJWTToken";

const ManageGigsTable = ({ authorId, initialJobs }) => {
  // TanStack Query Setup
  const { data: jobs } = useQuery({
    queryKey: ["my-gigs", authorId],
    queryFn: async () => {
      const token = await getClientJWTToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/my-gigs/${authorId}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
    initialData: initialJobs,
  });

  if (!jobs || jobs.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="max-w-md w-full bg-[#0a0f1d]/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 text-center shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {/* Glow & Icon Box */}
          <div className="relative w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full -z-10" />
            <FiFolderPlus className="w-8 h-8" />
          </div>

          {/* Text Area */}
          <h3 className="text-xl font-bold text-white mb-2">No Gigs Found</h3>
          <p className="text-sm text-slate-400 mb-6">
            You haven&apos;t posted any gig listings yet. Post a new gig to hire
            top talents for your project!
          </p>

          {/* Action Button */}
          <Link href="/client/add-job" className="inline-block">
            <Button
              variant="secondary"
              className="bg-linear-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <FiPlus className="w-4 h-4" />
              Create First Gig
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* ─── Page Heading ─── */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
          Manage Your Posted Gigs
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Track, monitor, and manage all the gig listings you have posted for
          your projects.
        </p>
      </div>

      {/* ─── Table Component ─── */}
      <Table className="w-full bg-neutral-600 text-white">
        <Table.ScrollContainer className="bg-neutral-600 text-white">
          <Table.Content
            aria-label="Team members"
            className="bg-neutral-600 text-white"
          >
            <Table.Header className="bg-neutral-600 text-white">
              <Table.Column isRowHeader className="text-white/80">
                Title
              </Table.Column>
              <Table.Column className="text-white/80">Category</Table.Column>
              <Table.Column className="text-white/80">Job Type</Table.Column>
              <Table.Column className="text-white/80">Price</Table.Column>
              <Table.Column className="text-white/80">Actions</Table.Column>
            </Table.Header>
            <Table.Body className="bg-neutral-600 text-white">
              {jobs.map((job) => (
                <Table.Row key={job._id} className="bg-neutral-600 text-white">
                  <Table.Cell className="bg-neutral-600 text-white">
                    {job.title}
                  </Table.Cell>
                  <Table.Cell className="bg-neutral-600 text-white">
                    {job.category}
                  </Table.Cell>
                  <Table.Cell className="bg-neutral-600 text-white">
                    {job.jobType}
                  </Table.Cell>
                  <Table.Cell className="bg-neutral-600 text-white">
                    ${job.budget}
                  </Table.Cell>
                  <Table.Cell className="bg-neutral-600 text-white flex gap-2 flex-wrap">
                    <Link href={`/gig/details/${job._id}`}>
                      <Button
                        variant="secondary"
                        className="rounded-full w-9 h-9 p-0"
                      >
                        <FaRegEye />
                      </Button>
                    </Link>
                    <DeleteGigModal job={job} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};

export default ManageGigsTable;
