"use client";

import { useState, useMemo } from "react";
import { cn, getDaysInMonth, getToday } from "@/lib/utils";

interface HabitCalendarProps {
  completedDates: string[];
  onToggleDate?: (date: string) => void;
}

export function HabitCalendar({ completedDates, onToggleDate }: HabitCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = getToday();

  const completedSet = useMemo(() => new Set(completedDates), [completedDates]);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return { day, dateStr, isCompleted: completedSet.has(dateStr), isToday: dateStr === today };
  });

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="rounded-lg p-2 hover:bg-surface-alt transition-colors text-tertiary hover:text-ink">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="font-display text-base text-ink">{monthName}</span>
        <button onClick={nextMonth} className="rounded-lg p-2 hover:bg-surface-alt transition-colors text-tertiary hover:text-ink">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1.5 text-center">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={`${d}-${i}`} className="text-[10px] font-bold uppercase tracking-widest text-tertiary pb-2">
            {d}
          </div>
        ))}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map(({ day, dateStr, isCompleted, isToday }) => (
          <button
            key={dateStr}
            onClick={() => onToggleDate?.(dateStr)}
            className={cn(
              "aspect-square rounded-xl text-xs font-medium transition-all duration-200 relative",
              isCompleted
                ? "bg-savings-soft text-savings hover:bg-savings-mid/40"
                : isToday
                  ? "bg-surface-alt text-ink font-bold ring-1 ring-savings/30"
                  : "text-tertiary hover:bg-surface-alt"
            )}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}
