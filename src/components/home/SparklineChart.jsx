"use client";

import { Card } from "@heroui/react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";

// Chart dataset for rendering the trend
const data = [
  { name: "Q1 Matches", uv: 20 },
  { name: "Q2 Matches", uv: 55 },
  { name: "Q3 Matches", uv: 102 },
  { name: "Q4 Current", uv: 140 },
];

// Custom component to render glowing neon dots on the chart line
const CustomDot = (props) => {
  const { cx, cy, index } = props;

  // Skip rendering for the first data point (Q1) to match original layout
  if (index === 0) return null;

  const dotColors = ["", "#3b82f6", "#06b6d4", "#10b981"];
  const fill = dotColors[index] || "#10b981";

  return (
    <g filter="url(#dot-glow)">
      <circle
        cx={cx}
        cy={cy}
        r={5}
        fill={fill}
        stroke="#0a0f1d"
        strokeWidth="2"
      />
    </g>
  );
};

export default function SparklineChart() {
  return (
    <Card className="bg-white/3 backdrop-blur-md border border-white/8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl col-span-full w-full">
      <div className="p-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-0.5">
              Growth performance
            </p>
            <h3 className="text-base font-bold text-white">
              Success Matching Trend
            </h3>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            +45% This Quarter
          </span>
        </div>

        {/* Chart Content Area */}
        <div className="w-full">
          <LineChart
            style={{ width: "100%", height: 320 }}
            responsive="true"
            data={data}
            margin={{
              top: 20,
              right: 25,
              bottom: 5,
              left: -15,
            }}
          >
            {/* SVG Definitions for Gradients and Filters */}
            <defs>
              <linearGradient id="stats-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>

              <filter
                id="dot-glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  in="SourceGraphic"
                  stdDeviation="3"
                  result="blur"
                />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Horizontal Grid Lines */}
            <CartesianGrid
              stroke="rgba(255,255,255,0.05)"
              strokeDasharray="5 5"
              vertical={false}
            />

            {/* X-Axis Setup with Edge Padding */}
            <XAxis
              dataKey="name"
              stroke="#64748b"
              tick={{ fill: "#64748b", fontSize: 10 }}
              dy={10}
              padding={{ left: 30, right: 30 }}
            />

            {/* Y-Axis Setup with Vertical Label */}
            <YAxis
              stroke="#64748b"
              tick={{ fill: "#64748b", fontSize: 10 }}
              label={{
                value: "MATCHES",
                position: "insideLeft",
                angle: -90,
                fill: "#64748b",
                fontSize: 10,
                offset: 10,
              }}
            />

            {/* Custom Styled Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(10, 15, 29, 0.9)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            {/* Core Trend Line Configuration */}
            <Line
              type="monotone"
              dataKey="uv"
              stroke="url(#stats-line)"
              strokeWidth={3}
              name="Success Rate"
              dot={<CustomDot />}
              activeDot={{ r: 8 }}
            />

            {/* Legend Setup */}
            <Legend
              align="right"
              wrapperStyle={{ paddingTop: "15px", fontSize: "10px" }}
            />

            {/* Recharts Live Debugging Tool */}
            <RechartsDevtools />
          </LineChart>
        </div>
      </div>
    </Card>
  );
}
