"use client";

import { CATEGORY_MAP } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { ExpenseCategory } from "@/types";

const BAR_COLORS = [
  "bg-expense",
  "bg-habit",
  "bg-invest",
  "bg-savings",
  "bg-pink-400",
  "bg-blue-400",
  "bg-orange-400",
  "bg-secondary",
];

interface SpendingChartProps {
  categoryBreakdown: Record<string, number>;
}

export function SpendingChart({ categoryBreakdown }: SpendingChartProps) {
  const entries = Object.entries(categoryBreakdown).sort(
    ([, a], [, b]) => b - a
  );

  if (entries.length === 0) {
    return (
      <div className="py-10 text-center text-sm text-tertiary font-display italic">
        No spending data for this period
      </div>
    );
  }

  const total = entries.reduce((sum, [, v]) => sum + v, 0);
  const max = Math.max(...entries.map(([, v]) => v));

  return (
    <div className="space-y-4">
      {entries.map(([category, amount], i) => {
        const cat = CATEGORY_MAP[category as ExpenseCategory];
        const pct = max > 0 ? (amount / max) * 100 : 0;
        const share = total > 0 ? Math.round((amount / total) * 100) : 0;
        return (
          <div
            key={category}
            className="animate-fade-up space-y-2"
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5 text-sm">
                <span className="text-base">{cat?.emoji}</span>
                <span className="font-medium text-ink">{cat?.label || category}</span>
                <span className="text-xs text-tertiary bg-surface-alt px-1.5 py-0.5 rounded-md">{share}%</span>
              </span>
              <span className="text-sm font-bold text-ink tabular-nums">
                {formatCurrency(amount)}
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-surface-alt overflow-hidden">
              <div
                className={`h-full rounded-full ${BAR_COLORS[i % BAR_COLORS.length]} transition-all duration-700 ease-out`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
