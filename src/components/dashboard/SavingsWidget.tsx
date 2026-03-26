import { SavingsGoal } from "@/types";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

interface SavingsWidgetProps {
  goals: SavingsGoal[];
  totalSaved: number;
  overallProgress: number;
}

export function SavingsWidget({ goals, totalSaved, overallProgress }: SavingsWidgetProps) {
  return (
    <div className="rounded-2xl border border-border bg-white p-4 animate-fade-up" style={{ animationDelay: "0.15s" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-savings-soft flex items-center justify-center">
            <svg className="h-3.5 w-3.5 text-savings" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h3 className="text-xs font-semibold text-ink">Savings</h3>
        </div>
        <Link href="/savings" className="text-[10px] font-medium text-savings hover:text-savings/80 transition-colors">View all</Link>
      </div>

      <div className="flex items-center justify-between mb-1.5">
        <span className="text-base font-bold text-ink tabular-nums">{formatCurrency(totalSaved)}</span>
        <span className="text-[10px] font-bold text-savings tabular-nums bg-savings-soft px-1.5 py-0.5 rounded-md">{overallProgress}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-surface-alt overflow-hidden mb-3">
        <div className="h-full rounded-full bg-savings transition-all duration-700" style={{ width: `${Math.min(overallProgress, 100)}%` }} />
      </div>

      {goals.length === 0 ? (
        <p className="text-[10px] text-tertiary text-center py-1 font-display italic">Set your first goal</p>
      ) : (
        <div className="space-y-2">
          {goals.slice(0, 2).map((goal) => {
            const progress = goal.targetAmount > 0 ? Math.round((goal.currentAmount / goal.targetAmount) * 100) : 0;
            return (
              <div key={goal.id} className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-surface-alt flex items-center justify-center text-xs">
                  {goal.icon || "🎯"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-ink truncate">{goal.name}</p>
                  <div className="h-1 rounded-full bg-surface-alt mt-0.5 overflow-hidden">
                    <div className="h-full rounded-full bg-savings/60" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <span className="text-[9px] font-semibold text-savings tabular-nums shrink-0">{progress}%</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
