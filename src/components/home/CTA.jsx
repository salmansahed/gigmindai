"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  Input,
  Button,
  TextField,
  FieldError,
} from "@heroui/react";
import { FiCheckCircle, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email || !email.trim()) {
      toast.error("Email field cannot be empty! Please enter your email.");
      return;
    }

    if (!email.includes("@") || email.trim().length < 5) {
      toast.error("Please enter a valid work email address.");
      return;
    }

    toast.success("Welcome aboard! Subscription Successful. 🎉");
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <section className="py-20 max-w-5xl mx-auto px-6 text-center">
      <Card className="bg-white/3 backdrop-blur-md border border-white/8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-3xl relative overflow-hidden">
        {/* Ambient glow orbs */}
        <div className="absolute w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl -top-12 -left-12 pointer-events-none" />
        <div className="absolute w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl -bottom-12 -right-12 pointer-events-none" />

        <CardContent className="p-8 md:p-12">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">
              Accelerate Your Product Pipeline
            </h2>
            <p className="text-slate-400 text-xs md:text-sm mb-8 leading-relaxed">
              Subscribe to our newsletter to receive curated lists of pre-vetted
              AI candidates, tech trends, and contract blueprints directly in
              your inbox.
            </p>

            {isSubscribed ? (
              <div className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 w-full justify-center">
                <FiCheckCircle className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-wider">
                  Subscription Successful! Welcome aboard.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                noValidate
                className="flex flex-col sm:flex-row w-full justify-center items-center gap-3 sm:gap-0 sm:items-end"
              >
                <TextField isRequired value={email} onChange={setEmail}>
                  <Input
                    type="email"
                    placeholder="Enter your work email address"
                    className="border border-white/20 bg-white/5 text-white placeholder:text-slate-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 w-full sm:w-auto h-11.5 rounded-full sm:rounded-l-2xl sm:rounded-r-none"
                  />
                </TextField>
                <Button
                  type="submit"
                  className="h-11.5 px-6 text-sm font-bold tracking-wide text-[#0a0f1d] bg-linear-to-r from-emerald-500 to-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all shrink-0 rounded-full sm:rounded-r-2xl sm:rounded-l-none"
                >
                  <FiSend className="w-4 h-4" />
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
