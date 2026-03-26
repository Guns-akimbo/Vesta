import { Habit } from "@/types";
import Link from "next/link";

interface HabitOverviewProps {
  habits: Habit[];
  todayProgress: number;
  isCompleted: (id: string) => boolean;
  onToggle: (id: string) => void;
}

export function HabitOverview({ habits, todayProgress, isCompleted, onToggle }: HabitOverviewProps) {
  const circumference = 2 * Math.PI * 34;
  const offset = circumference - (todayProgress / 100) * circumference;
  const completedCount = habits.filter((h) => isCompleted(h.id)).length;

  return (
    <div className="rounded-2xl border border-border bg-white p-5 animate-fade-up" style={{ animationDelay: "0.1s" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-habit-soft flex items-center justify-center">
            <svg className="h-4 w-4 text-habit" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-ink">Today&apos;s Habits</h3>
        </div>
        <Link href="/habits" className="text-[11px] font-medium text-savings hover:text-savings/80 transition-colors">View all</Link>
      </div>

      {habits.length === 0 ? (
        <p className="text-xs text-tertiary text-center py-4 font-display italic">No habits yet</p>
      ) : (
        <div className="flex gap-4">
          <div className="shrink-0">
            <div className="relative">
              <svg className="h-[76px] w-[76px] -rotate-90" viewBox="0 0 76 76">
                <circle cx="38" cy="38" r="34" fill="none" stroke="rgba(30, 28, 24, 0.06)" strokeWidth="5" />
                <circle cx="38" cy="38" r="34" fill="none" stroke={todayProgress >= 100 ? "#2A8C6E" : "#C07A2A"} strokeWidth="5" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-700 ease-out" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-ink tabular-nums">{todayProgress}%</span>
              </div>
            </div>
            <p className="text-[10px] text-tertiary mt-1 text-center">{completedCount}/{habits.length}</p>
          </div>

          <div className="flex-1 space-y-0.5 min-w-0">
            {habits.slice(0, 5).map((habit) => {
              const done = isCompleted(habit.id);
              return (
                <button
                  key={habit.id}
                  onClick={() => onToggle(habit.id)}
                  className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-left transition-all duration-200 ${done ? "bg-savings-soft/50 text-tertiary" : "text-ink hover:bg-surface-alt"}`}
                >
                  <span className={`flex h-4.5 w-4.5 items-center justify-center rounded-md shrink-0 border ${done ? "bg-savings border-savings" : "border-border-hover"}`}>
                    {done && <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                  </span>
                  <span className={`text-xs font-medium truncate ${done ? "line-through opacity-50" : ""}`}>{habit.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {todayProgress >= 100 && habits.length > 0 && (
        <div className="mt-3 rounded-xl bg-savings-soft border border-savings/15 px-3 py-2 text-center">
          <p className="text-xs font-semibold text-savings">All done today!</p>
        </div>
      )}
    </div>
  );
}
