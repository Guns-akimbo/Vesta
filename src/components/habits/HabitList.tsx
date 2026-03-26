"use client";

import { Habit } from "@/types";
import { HabitItem } from "./HabitItem";
import { EmptyState } from "@/components/ui/EmptyState";

interface HabitListProps {
  habits: Habit[];
  isCompleted: (id: string) => boolean;
  getStreak: (id: string) => number;
  getCompletionRate: (id: string) => number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function HabitList({
  habits,
  isCompleted,
  getStreak,
  getCompletionRate,
  onToggle,
  onDelete,
}: HabitListProps) {
  if (habits.length === 0) {
    return (
      <EmptyState
        icon="🎯"
        title="No habits yet"
        description="Build better routines by adding your first habit to track."
      />
    );
  }

  return (
    <div className="divide-y divide-border">
      {habits.map((habit, i) => (
        <div
          key={habit.id}
          className="animate-fade-up"
          style={{ animationDelay: `${i * 0.05}s` }}
        >
          <HabitItem
            habit={habit}
            isCompleted={isCompleted(habit.id)}
            streak={getStreak(habit.id)}
            completionRate={getCompletionRate(habit.id)}
            onToggle={() => onToggle(habit.id)}
            onDelete={() => onDelete(habit.id)}
          />
        </div>
      ))}
    </div>
  );
}
