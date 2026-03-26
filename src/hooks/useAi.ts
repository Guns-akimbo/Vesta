"use client";

import { useState, useCallback } from "react";
import { ParsedInput, AiInsight, Habit, Expense, HabitCompletion } from "@/types";
import { useLocalStorage } from "./useLocalStorage";
import { STORAGE_KEYS, INSIGHTS_CACHE_DURATION } from "@/lib/constants";

export function useAi() {
  const [insight, setInsight] = useLocalStorage<AiInsight | null>(
    STORAGE_KEYS.AI_INSIGHTS,
    null
  );
  const [isParsing, setIsParsing] = useState(false);
  const [isLoadingInsights, setIsLoadingInsights] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [insightError, setInsightError] = useState<string | null>(null);

  const parseInput = useCallback(
    async (text: string, habits: Habit[]): Promise<ParsedInput | null> => {
      setIsParsing(true);
      setParseError(null);
      try {
        const res = await fetch("/api/ai/parse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            habits: habits.map((h) => ({ id: h.id, name: h.name })),
          }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to parse input");
        }
        const data = await res.json();
        return data.result as ParsedInput;
      } catch (err) {
        setParseError(err instanceof Error ? err.message : "Parse failed");
        return null;
      } finally {
        setIsParsing(false);
      }
    },
    []
  );

  const getInsights = useCallback(
    async (
      expenses: Expense[],
      habits: Habit[],
      completions: HabitCompletion[],
      forceRefresh = false
    ) => {
      // Check cache
      if (!forceRefresh && insight) {
        const age = Date.now() - new Date(insight.generatedAt).getTime();
        if (age < INSIGHTS_CACHE_DURATION) return insight;
      }

      setIsLoadingInsights(true);
      setInsightError(null);
      try {
        const res = await fetch("/api/ai/insights", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ expenses, habits, completions }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Failed to get insights");
        }
        const data = await res.json();
        const newInsight: AiInsight = {
          content: data.insights,
          generatedAt: new Date().toISOString(),
        };
        setInsight(newInsight);
        return newInsight;
      } catch (err) {
        setInsightError(
          err instanceof Error ? err.message : "Insights failed"
        );
        return null;
      } finally {
        setIsLoadingInsights(false);
      }
    },
    [insight, setInsight]
  );

  return {
    insight,
    isParsing,
    isLoadingInsights,
    parseError,
    insightError,
    parseInput,
    getInsights,
  };
}
