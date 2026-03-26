"use client";

import { useMemo, useCallback } from "react";
import { Expense, ExpenseCategory } from "@/types";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "@/lib/constants";
import { generateId, getToday, getLastNDays } from "@/lib/utils";

export function useExpenses() {
  const [expenses, setExpenses, isHydrated] = useLocalStorage<Expense[]>(
    STORAGE_KEYS.EXPENSES,
    []
  );

  const addExpense = useCallback(
    (data: { amount: number; category: ExpenseCategory; description: string; date?: string }) => {
      const expense: Expense = {
        id: generateId(),
        amount: data.amount,
        category: data.category,
        description: data.description,
        date: data.date || getToday(),
        createdAt: new Date().toISOString(),
      };
      setExpenses((prev) => [expense, ...prev]);
      return expense;
    },
    [setExpenses]
  );

  const deleteExpense = useCallback(
    (id: string) => {
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    },
    [setExpenses]
  );

  const todayTotal = useMemo(() => {
    const today = getToday();
    return expenses
      .filter((e) => e.date === today)
      .reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  const weekTotal = useMemo(() => {
    const days = new Set(getLastNDays(7));
    return expenses
      .filter((e) => days.has(e.date))
      .reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  const monthTotal = useMemo(() => {
    const days = new Set(getLastNDays(30));
    return expenses
      .filter((e) => days.has(e.date))
      .reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  const categoryBreakdown = useMemo(() => {
    const days = new Set(getLastNDays(30));
    const breakdown: Record<string, number> = {};
    expenses
      .filter((e) => days.has(e.date))
      .forEach((e) => {
        breakdown[e.category] = (breakdown[e.category] || 0) + e.amount;
      });
    return breakdown;
  }, [expenses]);

  const recentExpenses = useMemo(() => {
    return [...expenses].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 20);
  }, [expenses]);

  return {
    expenses,
    isHydrated,
    addExpense,
    deleteExpense,
    todayTotal,
    weekTotal,
    monthTotal,
    categoryBreakdown,
    recentExpenses,
  };
}
