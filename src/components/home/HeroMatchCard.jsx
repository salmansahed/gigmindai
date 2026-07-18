"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, Slider } from "@heroui/react";
import { FiShield } from "react-icons/fi";

// ─── Static Data ──────────────────────────────────────────────────────────────

const STATS = [
  { label: "Portfolios scanned", value: "1,420" },
  { label: "Active matches today", value: "98" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroMatchCard() {
  const [matchRate, setMatchRate] = useState(95);

  // Autonomous drift — simulates a live AI engine fluctuating the score
  useEffect(() => {
    const id = setInterval(() => {
      setMatchRate((prev) => {
        const next = prev + (Math.random() > 0.5 ? 1 : -1);
        return Math.max(93, Math.min(99, next));
      });
    }, 3000);
    return () => clearInterval(id);
  }, []);

  // Colour band: 93-95 = amber, 96-98 = emerald, 99 = cyan
  const accentClass =
    matchRate >= 99
      ? "text-cyan-400"
      : matchRate >= 96
      ? "text-emerald-400"
      : "text-amber-400";

  const label =
    matchRate >= 99 ? "Perfect" : matchRate >= 96 ? "Excellent" : "Strong";

  return (
    <Card 
      className="bg-white/3 backdrop-blur-md border border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.37)] animate-float rounded-2xl w-[320px] lg:w-85"
    >
      <CardContent className="p-6 flex flex-col gap-4">
        {/* Header row */}
        <div className="flex items-center justify-between border-b border-white/8 pb-4">
          <div className="flex items-center gap-2">
            {/* Pulsing live indicator */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
              Live AI Matching
            </span>
          </div>
          <span className="text-[10px] text-slate-500">Match score</span>
        </div>

        {/* Score ring */}
        <div className="relative flex items-center justify-center py-2">
          {/* Spinning dashed orbit */}
          <div className="w-28 h-28 rounded-full border-4 border-dashed border-cyan-500/20 animate-[spin_22s_linear_infinite]" />
          {/* Static inner ring */}
          <div className="absolute w-20 h-20 rounded-full border border-white/8" />
          {/* Glow halo */}
          <div
            className="absolute w-24 h-24 rounded-full blur-xl transition-colors duration-700"
            style={{
              background:
                matchRate >= 99
                  ? "rgba(6,182,212,0.15)"
                  : matchRate >= 96
                  ? "rgba(16,185,129,0.15)"
                  : "rgba(245,158,11,0.12)",
            }}
          />
          {/* Centred text */}
          <div className="absolute flex flex-col items-center">
            <span
              className={`text-4xl font-black leading-none transition-colors duration-700 ${accentClass}`}
            >
              {matchRate}
              <span className="text-xl">%</span>
            </span>
            <span
              className={`text-[9px] font-bold uppercase tracking-widest mt-0.5 transition-colors duration-700 ${accentClass}`}
            >
              {label}
            </span>
          </div>
        </div>

        {/* Threshold slider */}
        <div>
          <label className="text-[10px] text-slate-500 mb-1.5 flex justify-between">
            <span>Match threshold</span>
            <span className={accentClass}>{matchRate}%</span>
          </label>
          <Slider
            size="sm"
            step={1}
            maxValue={99}
            minValue={80}
            value={matchRate}
            onChange={(val) => setMatchRate(val)}
            aria-label="Adjust AI match threshold"
            color="success"
            className="w-full"
            classNames={{
              track: "bg-white/10 h-1.5",
              filler: "bg-emerald-500",
              thumb: "bg-emerald-500 w-3 h-3 after:w-3 after:h-3 after:bg-emerald-500 shadow-none cursor-pointer",
            }}
          />
          <div className="flex justify-between text-[9px] text-slate-600 mt-1">
            <span>80 min</span>
            <span>99 perfect</span>
          </div>
        </div>

        {/* Mini stat rows */}
        <div className="grid grid-cols-2 gap-2">
          {STATS.map(({ label: l, value }) => (
            <div
              key={l}
              className="rounded-xl bg-white/4 border border-white/8 px-3 py-2 text-left"
            >
              <p className="text-[9px] text-slate-500 leading-none mb-0.5">{l}</p>
              <p className="text-sm font-bold text-white">{value}</p>
            </div>
          ))}
        </div>

        {/* Status footer */}
        <div className="flex items-center gap-3 rounded-xl bg-emerald-500/6 border border-emerald-500/15 p-3">
          <span className="flex-none p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <FiShield className="w-4 h-4" />
          </span>
          <div>
            <p className="text-[11px] font-bold text-white leading-tight">
              Smart Match Active
            </p>
            <p className="text-[9px] text-slate-400 leading-tight mt-0.5">
              Instantly scanning expert portfolios
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
