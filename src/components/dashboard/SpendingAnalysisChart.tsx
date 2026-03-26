"use client";

import { useMemo } from "react";
import { Expense } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface SpendingAnalysisChartProps {
  expenses: Expense[];
  totalSaved: number;
}

function getLastNMonths(n: number): { key: string; label: string; year: number; month: number }[] {
  const months: { key: string; label: string; year: number; month: number }[] = [];
  const now = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      label: d.toLocaleDateString("en-US", { month: "short" }),
      year: d.getFullYear(),
      month: d.getMonth(),
    });
  }
  return months;
}

export function SpendingAnalysisChart({ expenses, totalSaved }: SpendingAnalysisChartProps) {
  const months = useMemo(() => getLastNMonths(6), []);

  const monthlyData = useMemo(() => {
    const spending: Record<string, number> = {};
    expenses.forEach((e) => {
      const key = e.date.slice(0, 7); // YYYY-MM
      spending[key] = (spending[key] || 0) + e.amount;
    });

    return months.map((m) => {
      const spent = spending[m.key] || 0;
      return { ...m, spent };
    });
  }, [expenses, months]);

  const maxSpent = useMemo(() => Math.max(...monthlyData.map((d) => d.spent), 1), [monthlyData]);
  const totalSpent = useMemo(() => monthlyData.reduce((s, d) => s + d.spent, 0), [monthlyData]);
  const avgMonthly = totalSpent / Math.max(monthlyData.filter((d) => d.spent > 0).length, 1);

  const currentMonth = months[months.length - 1];
  const prevMonth = months[months.length - 2];
  const currentSpent = monthlyData[monthlyData.length - 1]?.spent || 0;
  const prevSpent = monthlyData[monthlyData.length - 2]?.spent || 0;
  const changePercent = prevSpent > 0 ? Math.round(((currentSpent - prevSpent) / prevSpent) * 100) : 0;
  const isUp = changePercent > 0;

  return (
    <div className="rounded-2xl border border-border bg-white p-4 sm:p-5 animate-fade-up">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-invest-soft flex items-center justify-center">
            <svg className="h-4 w-4 text-invest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-ink">Spending Analysis</h3>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-tertiary">{currentMonth?.label} vs {prevMonth?.label}</p>
          <p className={`text-xs font-bold ${isUp ? "text-expense" : "text-savings"}`}>
            {isUp ? "+" : ""}{changePercent}%
          </p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="flex gap-3 sm:gap-4 mb-4 mt-3">
        <div className="min-w-0">
          <p className="text-[9px] sm:text-[10px] font-medium text-tertiary uppercase tracking-wider">6-Mo Total</p>
          <p className="text-sm sm:text-base font-bold text-ink tabular-nums truncate">{formatCurrency(totalSpent)}</p>
        </div>
        <div className="min-w-0">
          <p className="text-[9px] sm:text-[10px] font-medium text-tertiary uppercase tracking-wider">Avg/Month</p>
          <p className="text-sm sm:text-base font-bold text-ink tabular-nums truncate">{formatCurrency(avgMonthly)}</p>
        </div>
        <div className="min-w-0">
          <p className="text-[9px] sm:text-[10px] font-medium text-tertiary uppercase tracking-wider">Saved</p>
          <p className="text-sm sm:text-base font-bold text-savings tabular-nums truncate">{formatCurrency(totalSaved)}</p>
        </div>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-1.5 sm:gap-2 h-24 sm:h-32 mb-2">
        {monthlyData.map((d, i) => {
          const height = maxSpent > 0 ? Math.max((d.spent / maxSpent) * 100, d.spent > 0 ? 6 : 2) : 2;
          const isCurrent = i === monthlyData.length - 1;
          return (
            <div key={d.key} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end justify-center" style={{ height: "100%" }}>
                <div
                  className={`w-full max-w-[40px] rounded-t-lg transition-all duration-500 ${
                    isCurrent ? "bg-expense" : "bg-expense/25"
                  }`}
                  style={{ height: `${height}%` }}
                  title={`${d.label}: ${formatCurrency(d.spent)}`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Month labels */}
      <div className="flex gap-2">
        {monthlyData.map((d, i) => (
          <div key={d.key} className="flex-1 text-center">
            <p className={`text-[10px] ${i === monthlyData.length - 1 ? "font-bold text-ink" : "text-tertiary"}`}>
              {d.label}
            </p>
            <p className="text-[9px] text-tertiary tabular-nums mt-0.5">
              {d.spent > 0 ? formatCurrency(d.spent) : "--"}
            </p>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
        <span className="flex items-center gap-1.5 text-[10px] text-tertiary">
          <span className="h-2 w-2 rounded-sm bg-expense" />Current month
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-tertiary">
          <span className="h-2 w-2 rounded-sm bg-expense/25" />Previous
        </span>
      </div>
    </div>
  );
}
