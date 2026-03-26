"use client";

import { useMemo, useCallback } from "react";
import { Investment, InvestmentType } from "@/types";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS } from "@/lib/constants";
import { generateId, getToday } from "@/lib/utils";

export function useInvestments() {
  const [investments, setInvestments, isHydrated] = useLocalStorage<Investment[]>(
    STORAGE_KEYS.INVESTMENTS,
    []
  );

  const addInvestment = useCallback(
    (data: {
      name: string;
      type: InvestmentType;
      amountInvested: number;
      currentValue: number;
      date?: string;
      ticker?: string;
      notes?: string;
    }) => {
      const investment: Investment = {
        id: generateId(),
        name: data.name,
        type: data.type,
        amountInvested: data.amountInvested,
        currentValue: data.currentValue,
        date: data.date || getToday(),
        status: "active",
        ticker: data.ticker,
        notes: data.notes,
        createdAt: new Date().toISOString(),
      };
      setInvestments((prev) => [investment, ...prev]);
      return investment;
    },
    [setInvestments]
  );

  const updateInvestment = useCallback(
    (id: string, updates: Partial<Pick<Investment, "currentValue" | "status" | "notes" | "ticker">>) => {
      setInvestments((prev) =>
        prev.map((inv) => (inv.id === id ? { ...inv, ...updates } : inv))
      );
    },
    [setInvestments]
  );

  const deleteInvestment = useCallback(
    (id: string) => {
      setInvestments((prev) => prev.filter((inv) => inv.id !== id));
    },
    [setInvestments]
  );

  const totalInvested = useMemo(
    () => investments.filter((i) => i.status === "active").reduce((sum, i) => sum + i.amountInvested, 0),
    [investments]
  );

  const totalCurrentValue = useMemo(
    () => investments.filter((i) => i.status === "active").reduce((sum, i) => sum + i.currentValue, 0),
    [investments]
  );

  const totalPnL = useMemo(() => totalCurrentValue - totalInvested, [totalCurrentValue, totalInvested]);

  const pnlPercent = useMemo(
    () => (totalInvested > 0 ? ((totalPnL / totalInvested) * 100) : 0),
    [totalPnL, totalInvested]
  );

  const activeInvestments = useMemo(
    () => investments.filter((i) => i.status === "active"),
    [investments]
  );

  return {
    investments,
    isHydrated,
    addInvestment,
    updateInvestment,
    deleteInvestment,
    totalInvested,
    totalCurrentValue,
    totalPnL,
    pnlPercent,
    activeInvestments,
  };
}
