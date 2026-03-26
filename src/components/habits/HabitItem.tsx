"use client";

import { useState } from "react";
import { Habit } from "@/types";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

interface HabitItemProps {
  habit: Habit;
  isCompleted: boolean;
  streak: number;
  completionRate: number;
  onToggle: () => void;
  onDelete: () => void;
}

export function HabitItem({ habit, isCompleted, streak, completionRate, onToggle, onDelete }: HabitItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className="flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-surface-alt -mx-1">
        <button
          onClick={onToggle}
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base transition-all duration-200 ${
            isCompleted
              ? "bg-savings shadow-md shadow-savings/15"
              : "border-2 border-border-hover hover:border-secondary"
          }`}
        >
          {isCompleted ? (
            <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <span className="text-sm">{habit.icon || "🎯"}</span>
          )}
        </button>

        <button onClick={() => setExpanded(!expanded)} className="flex-1 min-w-0 text-left">
          <p className={`text-sm font-medium transition-all duration-200 ${isCompleted ? "text-tertiary line-through" : "text-ink"}`}>
            {habit.name}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            {streak > 0 && <Badge variant="success">{streak}d streak</Badge>}
            <span className="text-[11px] text-tertiary tabular-nums">{completionRate}% / 30d</span>
          </div>
        </button>

        <svg className={`h-3.5 w-3.5 text-tertiary shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {expanded && (
        <div className="ml-13 mr-1 mb-2 rounded-xl bg-surface-alt border border-border px-4 py-3 animate-scale-in">
          <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
            <div>
              <p className="text-tertiary">Current Streak</p>
              <p className="font-semibold text-ink">{streak} day{streak !== 1 ? "s" : ""}</p>
            </div>
            <div>
              <p className="text-tertiary">30-Day Rate</p>
              <p className="font-semibold text-ink">{completionRate}%</p>
            </div>
            <div>
              <p className="text-tertiary">Today</p>
              <p className={`font-semibold ${isCompleted ? "text-savings" : "text-secondary"}`}>{isCompleted ? "Completed" : "Not yet"}</p>
            </div>
            <div>
              <p className="text-tertiary">Created</p>
              <p className="font-semibold text-ink">{formatDate(habit.createdAt)}</p>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-border flex justify-end">
            <button onClick={onDelete} className="text-[11px] font-semibold text-expense hover:text-expense/80 transition-colors">
              Delete habit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
