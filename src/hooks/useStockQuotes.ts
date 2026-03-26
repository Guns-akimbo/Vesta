"use client";

import { useState, useEffect, useCallback } from "react";
import { StockQuote } from "@/types";

export function useStockQuotes(tickers: string[]) {
  const [quotes, setQuotes] = useState<Record<string, StockQuote>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuotes = useCallback(async () => {
    const uniqueTickers = Array.from(new Set(tickers.filter(Boolean)));
    if (uniqueTickers.length === 0) return;

    setIsLoading(true);
    setError(null);

    try {
      const results = await Promise.allSettled(
        uniqueTickers.map(async (symbol) => {
          const res = await fetch(`/api/stocks/quote?symbol=${encodeURIComponent(symbol)}`);
          if (!res.ok) return null;
          return res.json() as Promise<StockQuote>;
        })
      );

      const newQuotes: Record<string, StockQuote> = {};
      results.forEach((result) => {
        if (result.status === "fulfilled" && result.value) {
          newQuotes[result.value.symbol] = result.value;
        }
      });
      setQuotes(newQuotes);
    } catch {
      setError("Failed to fetch stock quotes");
    } finally {
      setIsLoading(false);
    }
  }, [tickers]);

  useEffect(() => {
    fetchQuotes();
    // Refresh every 5 minutes
    const interval = setInterval(fetchQuotes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchQuotes]);

  return { quotes, isLoading, error, refresh: fetchQuotes };
}
