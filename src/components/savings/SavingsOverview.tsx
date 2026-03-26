import { formatCurrency } from "@/lib/utils";

interface SavingsOverviewProps {
  totalSaved: number;
  totalTarget: number;
  overallProgress: number;
  goalCount: number;
}

export function SavingsOverview({ totalSaved, totalTarget, overallProgress, goalCount }: SavingsOverviewProps) {
  const circumference = 2 * Math.PI * 38;
  const offset = circumference - (overallProgress / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-savings/15 bg-savings-soft p-4 sm:p-5 animate-fade-up">
      <div className="flex items-center gap-4 sm:gap-5">
        <div className="relative shrink-0">
          <svg className="h-20 w-20 sm:h-24 sm:w-24 -rotate-90" viewBox="0 0 88 88">
            <circle cx="44" cy="44" r="38" fill="none" stroke="rgba(30, 28, 24, 0.06)" strokeWidth="5" />
            <circle
              cx="44" cy="44" r="38" fill="none"
              stroke="#2A8C6E" strokeWidth="5" strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={offset}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl sm:text-2xl font-bold text-ink tabular-nums">{overallProgress}%</span>
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-savings/70">Total Saved</p>
          <p className="text-2xl sm:text-3xl font-bold text-ink tabular-nums font-display truncate">{formatCurrency(totalSaved)}</p>
          <p className="text-xs text-secondary mt-1">of {formatCurrency(totalTarget)} across {goalCount} goal{goalCount !== 1 ? "s" : ""}</p>
        </div>
      </div>
    </div>
  );
}
