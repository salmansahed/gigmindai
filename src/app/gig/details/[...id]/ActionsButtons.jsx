"use client";

import { useClientUserSession } from "@/hooks/useClientUserSession";
import { Button } from "@heroui/react";
import React from "react";
import { FiBookmark, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";

const ActionsButtons = () => {
  const { user } = useClientUserSession();

  const handleApplyNow = () => {
    if (!user) {
      toast.error("You must be logged in to apply for this gig.");
      return;
    }
    if (user.role === "user") {
      toast.error("Only freelancers can apply for gigs.");
      return;
    }
    if (user.role === "client") {
      toast.error("Only freelancers can apply for gigs.");
      return;
    }
    if (user.role === "freelancer") {
      toast.success("You have successfully applied for this gig!");
    }
  };
  const handleSaveGig = () => {
    if (!user) {
      toast.error("You must be logged in to save this gig.");
      return;
    }
    if (user.role === "user") {
      toast.error("Only freelancers can save gigs.");
      return;
    }
    if (user.role === "client") {
      toast.error("Only freelancers can save gigs.");
      return;
    }
    if (user.role === "freelancer") {
      toast.success("You have successfully saved this gig!");
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <Button
        onClick={handleApplyNow}
        className="w-full h-11 text-xs font-black uppercase tracking-widest text-[#0a0f1d] bg-linear-to-r from-emerald-500 to-emerald-400 hover:shadow-[0_0_24px_rgba(16,185,129,0.45)] active:scale-98 transition-all duration-200"
      >
        <FiSend className="w-3.5 h-3.5" />
        Apply Now
      </Button>

      <Button
        onClick={handleSaveGig}
        variant="outline"
        className="w-full h-11 text-xs font-black uppercase tracking-widest text-white border-white/20 hover:bg-white/10 active:scale-98 transition-all duration-200"
      >
        <FiBookmark className="w-3.5 h-3.5" />
        Save This Gig
      </Button>
    </div>
  );
};

export default ActionsButtons;
