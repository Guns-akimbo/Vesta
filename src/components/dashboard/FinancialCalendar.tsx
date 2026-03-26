"use client";

import { useState, useMemo } from "react";
import { Expense } from "@/types";
import { cn, getDaysInMonth, getToday, formatCurrency } from "@/lib/utils";

interface FinancialCalendarProps {
  expenses: Expense[];
}

export function FinancialCalendar({ expenses }: FinancialCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = getToday();

  const dailyTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    expenses.forEach((e) => {
      totals[e.date] = (totals[e.date] || 0) + e.amount;
    });
    return totals;
  }, [expenses]);

  const maxDaily = useMemo(() => Math.max(...Object.values(dailyTotals), 1), [dailyTotals]);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const monthName = currentDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const spent = dailyTotals[dateStr] || 0;
    return { day, dateStr, spent, isToday: dateStr === today };
  });

  const selectedExpenses = selectedDate
    ? expenses.filter((e) => e.date === selectedDate)
    : [];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getIntensity = (spent: number) => {
    if (spent === 0) return "";
    const ratio = spent / maxDaily;
    if (ratio > 0.7) return "bg-expense-soft text-expense";
    if (ratio > 0.4) return "bg-habit-soft text-habit";
    return "bg-savings-soft text-savings";
  };

  return (
    <div className="rounded-2xl border border-border bg-white p-4 animate-fade-up">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-savings-soft flex items-center justify-center">
            <svg className="h-3.5 w-3.5 text-savings" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-xs font-semibold text-ink">Calendar</h3>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={prevMonth} className="rounded p-1 hover:bg-surface-alt transition-colors text-tertiary hover:text-ink">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-[11px] font-semibold text-ink min-w-[70px] text-center">{monthName}</span>
          <button onClick={nextMonth} className="rounded p-1 hover:bg-surface-alt transition-colors text-tertiary hover:text-ink">
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={`${d}-${i}`} className="text-[8px] font-bold uppercase tracking-widest text-tertiary pb-1">
            {d}
          </div>
        ))}
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map(({ day, dateStr, spent, isToday }) => (
          <button
            key={dateStr}
            onClick={() => setSelectedDate(selectedDate === dateStr ? null : dateStr)}
            className={cn(
              "aspect-square rounded text-[9px] font-medium transition-all duration-200 relative",
              spent > 0 ? getIntensity(spent) : "text-tertiary hover:bg-surface-alt",
              isToday && "ring-1 ring-savings/40",
              selectedDate === dateStr && "ring-1 ring-savings"
            )}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Selected day breakdown */}
      {selectedDate && selectedExpenses.length > 0 && (
        <div className="mt-2 pt-2 border-t border-border animate-scale-in">
          <p className="text-[9px] font-semibold uppercase tracking-wider text-tertiary mb-1">
            {new Date(selectedDate + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })} — {formatCurrency(dailyTotals[selectedDate] || 0)}
          </p>
          <div className="space-y-1">
            {selectedExpenses.slice(0, 3).map((e) => (
              <div key={e.id} className="flex items-center justify-between text-[10px]">
                <span className="text-secondary truncate">{e.description}</span>
                <span className="text-ink font-semibold tabular-nums shrink-0 ml-2">{formatCurrency(e.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
