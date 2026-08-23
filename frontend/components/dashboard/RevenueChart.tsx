"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import GlassCard from "@/components/shared/GlassCard";

const data = [
  { month: "Week 1", baseline: 980000, rafon: 1120000 },
  { month: "Week 2", baseline: 1080000, rafon: 1290000 },
  { month: "Week 3", baseline: 1210000, rafon: 1510000 },
  { month: "Week 4", baseline: 1320000, rafon: 1740000 },
  { month: "Current", baseline: 1420000, rafon: 1842900 },
];

function formatRupees(value: number) {
  return `₹${(value / 100000).toFixed(1)}L`;
}

export default function RevenueChart() {
  return (
    <GlassCard className="p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-bold">
            Autonomous Revenue Growth
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Baseline merchant revenue vs RAFON-assisted revenue
          </p>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-semibold">
          <div className="flex items-center gap-2 text-slate-500">
            <span className="h-2 w-2 rounded-full bg-slate-500" />
            Baseline
          </div>

          <div className="flex items-center gap-2 text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-300" />
            RAFON AI
          </div>
        </div>
      </div>

      <div className="mt-6 h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient
                id="rafonRevenue"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#00f2fe"
                  stopOpacity={0.35}
                />
                <stop
                  offset="100%"
                  stopColor="#00f2fe"
                  stopOpacity={0}
                />
              </linearGradient>

              <linearGradient
                id="baselineRevenue"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#64748b"
                  stopOpacity={0.18}
                />
                <stop
                  offset="100%"
                  stopColor="#64748b"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke="rgba(255,255,255,0.05)"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 10,
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 10,
              }}
              tickFormatter={formatRupees}
              width={48}
            />

            <Tooltip
              contentStyle={{
                background: "#0d1324",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "14px",
                color: "#fff",
              }}
              formatter={(value) => [
                `₹${Number(value).toLocaleString("en-IN")}`,
                "",
              ]}
            />

            <Area
              type="monotone"
              dataKey="baseline"
              stroke="#64748b"
              strokeWidth={2}
              fill="url(#baselineRevenue)"
            />

            <Area
              type="monotone"
              dataKey="rafon"
              stroke="#00f2fe"
              strokeWidth={3}
              fill="url(#rafonRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
