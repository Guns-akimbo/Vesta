"use client";

import { useMemo, useCallback } from "react";
import { Habit, HabitCompletion } from "@/types";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "@/lib/constants";
import { generateId, getToday, calculateStreak, getLastNDays } from "@/lib/utils";

export function useHabits() {
  const [habits, setHabits, isHydrated] = useLocalStorage<Habit[]>(
    STORAGE_KEYS.HABITS,
    []
  );
  const [completions, setCompletions] = useLocalStorage<HabitCompletion[]>(
    STORAGE_KEYS.COMPLETIONS,
    []
  );

  const addHabit = useCallback(
    (data: { name: string; icon?: string }) => {
      const habit: Habit = {
        id: generateId(),
        name: data.name,
        icon: data.icon,
        createdAt: new Date().toISOString(),
      };
      setHabits((prev) => [...prev, habit]);
      return habit;
    },
    [setHabits]
  );

  const deleteHabit = useCallback(
    (id: string) => {
      setHabits((prev) => prev.filter((h) => h.id !== id));
      setCompletions((prev) => prev.filter((c) => c.habitId !== id));
    },
    [setHabits, setCompletions]
  );

  const toggleCompletion = useCallback(
    (habitId: string, date?: string) => {
      const d = date || getToday();
      setCompletions((prev) => {
        const existing = prev.find(
          (c) => c.habitId === habitId && c.date === d
        );
        if (existing) {
          if (existing.completed) {
            return prev.filter(
              (c) => !(c.habitId === habitId && c.date === d)
            );
          }
          return prev.map((c) =>
            c.habitId === habitId && c.date === d
              ? { ...c, completed: true }
              : c
          );
        }
        return [...prev, { habitId, date: d, completed: true }];
      });
    },
    [setCompletions]
  );

  const isCompleted = useCallback(
    (habitId: string, date?: string) => {
      const d = date || getToday();
      return completions.some(
        (c) => c.habitId === habitId && c.date === d && c.completed
      );
    },
    [completions]
  );

  const getStreak = useCallback(
    (habitId: string) => {
      const dates = new Set(
        completions
          .filter((c) => c.habitId === habitId && c.completed)
          .map((c) => c.date)
      );
      return calculateStreak(dates);
    },
    [completions]
  );

  const getCompletionRate = useCallback(
    (habitId: string, days: number = 30) => {
      const last = getLastNDays(days);
      const completedCount = last.filter((d) =>
        completions.some(
          (c) => c.habitId === habitId && c.date === d && c.completed
        )
      ).length;
      return days > 0 ? Math.round((completedCount / days) * 100) : 0;
    },
    [completions]
  );

  const todayProgress = useMemo(() => {
    if (habits.length === 0) return 0;
    const today = getToday();
    const completed = habits.filter((h) =>
      completions.some(
        (c) => c.habitId === h.id && c.date === today && c.completed
      )
    ).length;
    return Math.round((completed / habits.length) * 100);
  }, [habits, completions]);

  const getCompletionsForMonth = useCallback(
    (habitId: string, year: number, month: number) => {
      const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
      return completions
        .filter(
          (c) =>
            c.habitId === habitId &&
            c.date.startsWith(prefix) &&
            c.completed
        )
        .map((c) => c.date);
    },
    [completions]
  );

  return {
    habits,
    completions,
    isHydrated,
    addHabit,
    deleteHabit,
    toggleCompletion,
    isCompleted,
    getStreak,
    getCompletionRate,
    todayProgress,
    getCompletionsForMonth,
  };
}
