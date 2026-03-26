import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

interface SpendingOverviewProps {
  todayTotal: number;
  weekTotal: number;
  monthTotal: number;
  categoryBreakdown?: Record<string, number>;
}

const CATEGORY_COLORS: Record<string, string> = {
  food: "bg-orange-400",
  transport: "bg-invest",
  entertainment: "bg-pink-400",
  shopping: "bg-habit",
  bills: "bg-secondary",
  health: "bg-expense",
  education: "bg-invest",
  other: "bg-tertiary",
};

export function SpendingOverview({ todayTotal, weekTotal, monthTotal, categoryBreakdown }: SpendingOverviewProps) {
  const maxVal = Math.max(todayTotal, weekTotal, monthTotal, 1);
  const breakdown = categoryBreakdown || {};
  const categories = Object.entries(breakdown).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const maxCat = categories.length > 0 ? categories[0][1] : 1;

  return (
    <div className="rounded-2xl border border-border bg-white p-4 sm:p-5 animate-fade-up" style={{ animationDelay: "0.05s" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-expense-soft flex items-center justify-center">
            <svg className="h-4 w-4 text-expense" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8V7m0 1v8m0 0v1" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-ink">Spending</h3>
        </div>
        <Link href="/expenses" className="text-[11px] font-medium text-savings hover:text-savings/80 transition-colors">View all</Link>
      </div>

      <div className="space-y-3">
        {[
          { label: "Today", value: todayTotal, color: "bg-expense" },
          { label: "This week", value: weekTotal, color: "bg-habit" },
          { label: "This month", value: monthTotal, color: "bg-secondary" },
        ].map((item) => (
          <div key={item.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-secondary">{item.label}</span>
              <span className="text-xs font-bold text-ink tabular-nums">{formatCurrency(item.value)}</span>
            </div>
            <div className="h-2 rounded-full bg-surface-alt overflow-hidden">
              <div className={`h-full rounded-full ${item.color} transition-all duration-700 ease-out`} style={{ width: `${Math.max((item.value / maxVal) * 100, item.value > 0 ? 4 : 0)}%` }} />
            </div>
          </div>
        ))}
      </div>

      {categories.length > 0 && (
        <div className="border-t border-border pt-3 mt-4">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-tertiary mb-2.5">Top categories</p>
          <div className="space-y-2">
            {categories.map(([cat, amount]) => (
              <div key={cat} className="flex items-center gap-2.5">
                <div className={`h-2 w-2 rounded-full ${CATEGORY_COLORS[cat] || "bg-tertiary"}`} />
                <span className="text-xs text-secondary capitalize w-20 truncate">{cat}</span>
                <div className="flex-1">
                  <div className="h-1 rounded-full bg-surface-alt overflow-hidden">
                    <div className={`h-full rounded-full ${CATEGORY_COLORS[cat] || "bg-tertiary"} opacity-60`} style={{ width: `${(amount / maxCat) * 100}%` }} />
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-ink tabular-nums">{formatCurrency(amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
