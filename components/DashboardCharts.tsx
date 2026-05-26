"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Label,
} from "recharts";

interface DashboardChartsProps {
  stats: {
    level1: number;
    level2: number;
    level3: number;
    level4: number;
    total: number;
    chartData: { name: string; count: number }[];
  };
}

export default function DashboardCharts({ stats }: DashboardChartsProps) {
  const pieData = [
    { name: "Vừa gieo", value: stats.level1, color: "#cbd5e1" }, // Slate-300
    { name: "Lên chồi", value: stats.level2, color: "#60a5fa" }, // Blue-400
    { name: "Bám rễ", value: stats.level3, color: "#8b5cf6" }, // Violet-500
    { name: "Thuộc làu", value: stats.level4, color: "#10b981" }, // Emerald-500
  ];
  const totalWords = pieData.reduce((acc, curr) => acc + curr.value, 0);
  const memorizedPercent =
    totalWords > 0
      ? Math.round(
          ((stats.level2 + stats.level3 + stats.level4) / totalWords) * 100
        )
      : 0;

  return (
    <>
      {/* Activity Chart */}
      <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
          <div className="text-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
          </div>
          <h3 className="font-bold text-slate-800">Từ vựng mới (7 ngày qua)</h3>
        </div>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <BarChart data={stats.chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
                dy={10}
              />
              <YAxis hide />
              <Tooltip
                cursor={{ fill: "#f1f5f9" }}
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  fontWeight: "700",
                }}
              />
              <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mastery Distribution Chart */}
      <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-100">
        <div className="flex items-center gap-2 mb-6">
          <div className="text-emerald-500">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
          </div>
          <h3 className="font-bold text-slate-800">Tỷ lệ ghi nhớ</h3>
        </div>
        <div className="h-[250px] w-full flex items-center justify-center relative">
          {/* Decorative background glow behind the pie chart */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <ResponsiveContainer width="100%" height="100%" minWidth={0}>
            <PieChart>
              <defs>
                <filter id="pieShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.15" />
                </filter>
              </defs>
              <Pie
                data={pieData}
                innerRadius={70}
                outerRadius={95}
                paddingAngle={6}
                cornerRadius={8}
                dataKey="value"
                stroke="none"
                style={{ filter: "url(#pieShadow)" }}
              >
                <Label
                  content={({ viewBox }) => {
                    const { cx, cy } = viewBox as any;
                    return (
                      <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
                        <tspan x={cx} dy="-0.2em" fontSize="32" fontWeight="800" fill="#1e293b">
                          {memorizedPercent}%
                        </tspan>
                        <tspan x={cx} dy="1.6em" fontSize="11" fill="#64748b" fontWeight="700" letterSpacing="0.05em">
                          GHI NHỚ
                        </tspan>
                      </text>
                    );
                  }}
                  position="center"
                />
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} className="hover:opacity-80 transition-opacity duration-300 outline-none" />
                ))}
              </Pie>
              <Tooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    const percent = totalWords > 0 ? ((data.value / totalWords) * 100).toFixed(1) : 0;
                    return (
                      <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/60">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }}></div>
                          <p className="font-bold text-slate-800 text-sm">{data.name}</p>
                        </div>
                        <div className="flex items-end gap-2">
                          <span className="text-2xl font-black text-slate-800 leading-none">{data.value}</span>
                          <span className="text-slate-500 font-medium text-sm mb-0.5">từ</span>
                          <span className="ml-auto text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded-lg text-xs">{percent}%</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                verticalAlign="middle"
                align="right"
                layout="vertical"
                iconType="circle"
                iconSize={10}
                formatter={(value) => <span className="text-sm font-semibold text-slate-700 ml-1">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
