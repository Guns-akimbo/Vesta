interface StreakDisplayProps {
  todayProgress: number;
  totalHabits: number;
}

export function StreakDisplay({ todayProgress, totalHabits }: StreakDisplayProps) {
  const circumference = 2 * Math.PI * 38;
  const offset = circumference - (todayProgress / 100) * circumference;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-habit/15 bg-habit-soft p-5 animate-fade-up">
      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          <svg className="h-24 w-24 -rotate-90" viewBox="0 0 88 88">
            <circle
              cx="44"
              cy="44"
              r="38"
              fill="none"
              stroke="rgba(30, 28, 24, 0.06)"
              strokeWidth="5"
            />
            <circle
              cx="44"
              cy="44"
              r="38"
              fill="none"
              stroke={todayProgress >= 100 ? "#2A8C6E" : "#C07A2A"}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-ink tabular-nums">{todayProgress}%</span>
          </div>
        </div>
        <div>
          <h3 className="font-display text-xl text-ink">Today&apos;s Progress</h3>
          <p className="text-sm text-secondary mt-1">
            {totalHabits === 0
              ? "Add habits to start tracking"
              : `${totalHabits} habit${totalHabits !== 1 ? "s" : ""} to complete`}
          </p>
        </div>
      </div>
    </div>
  );
}
