"use client";

import { useMemo, useCallback } from "react";
import { SavingsGoal, SavingsTransaction } from "@/types";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "@/lib/constants";
import { generateId, getToday } from "@/lib/utils";

export function useSavings() {
  const [goals, setGoals, isHydrated] = useLocalStorage<SavingsGoal[]>(
    STORAGE_KEYS.SAVINGS_GOALS,
    []
  );
  const [transactions, setTransactions] = useLocalStorage<SavingsTransaction[]>(
    STORAGE_KEYS.SAVINGS_TRANSACTIONS,
    []
  );

  const addGoal = useCallback(
    (data: { name: string; targetAmount: number; deadline?: string; icon?: string }) => {
      const goal: SavingsGoal = {
        id: generateId(),
        name: data.name,
        targetAmount: data.targetAmount,
        currentAmount: 0,
        deadline: data.deadline,
        icon: data.icon,
        createdAt: new Date().toISOString(),
      };
      setGoals((prev) => [...prev, goal]);
      return goal;
    },
    [setGoals]
  );

  const deleteGoal = useCallback(
    (id: string) => {
      setGoals((prev) => prev.filter((g) => g.id !== id));
      setTransactions((prev) => prev.filter((t) => t.goalId !== id));
    },
    [setGoals, setTransactions]
  );

  const addTransaction = useCallback(
    (goalId: string, amount: number, note?: string) => {
      const txn: SavingsTransaction = {
        id: generateId(),
        goalId,
        amount,
        date: getToday(),
        note,
        createdAt: new Date().toISOString(),
      };
      setTransactions((prev) => [txn, ...prev]);
      setGoals((prev) =>
        prev.map((g) =>
          g.id === goalId
            ? { ...g, currentAmount: Math.max(0, g.currentAmount + amount) }
            : g
        )
      );
      return txn;
    },
    [setGoals, setTransactions]
  );

  const totalSaved = useMemo(
    () => goals.reduce((sum, g) => sum + g.currentAmount, 0),
    [goals]
  );

  const totalTarget = useMemo(
    () => goals.reduce((sum, g) => sum + g.targetAmount, 0),
    [goals]
  );

  const overallProgress = useMemo(
    () => (totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0),
    [totalSaved, totalTarget]
  );

  const getGoalTransactions = useCallback(
    (goalId: string) => transactions.filter((t) => t.goalId === goalId),
    [transactions]
  );

  return {
    goals,
    transactions,
    isHydrated,
    addGoal,
    deleteGoal,
    addTransaction,
    totalSaved,
    totalTarget,
    overallProgress,
    getGoalTransactions,
  };
}
