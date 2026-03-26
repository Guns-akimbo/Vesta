"use client";

import { useState, useEffect, useRef } from "react";
import { InvestmentType } from "@/types";
import { INVESTMENT_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getToday } from "@/lib/utils";

interface StockMatch {
  symbol: string;
  name: string;
}

interface InvestmentFormProps {
  onSubmit: (data: {
    name: string;
    type: InvestmentType;
    amountInvested: number;
    currentValue: number;
    date: string;
    ticker?: string;
    notes?: string;
  }) => void;
  onCancel?: () => void;
}

export function InvestmentForm({ onSubmit, onCancel }: InvestmentFormProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<InvestmentType>("stocks");
  const [amountInvested, setAmountInvested] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [date, setDate] = useState(getToday());
  const [ticker, setTicker] = useState("");
  const [notes, setNotes] = useState("");

  const [searchResults, setSearchResults] = useState<StockMatch[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<StockMatch | null>(null);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedMatch) return;
    if (!name.trim() || name.trim().length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    if (type !== "stocks" && type !== "crypto" && type !== "mutual_funds") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(`/api/stocks/search?q=${encodeURIComponent(name.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.results || []);
          setShowResults((data.results || []).length > 0);
        }
      } catch {
        // Silently fail
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [name, type, selectedMatch]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSelectMatch = (match: StockMatch) => {
    setName(match.name);
    setTicker(match.symbol);
    setSelectedMatch(match);
    setShowResults(false);
    setSearchResults([]);
  };

  const handleNameChange = (value: string) => {
    setName(value);
    setSelectedMatch(null);
    if (ticker && !value.trim()) {
      setTicker("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const invested = parseFloat(amountInvested);
    const current = parseFloat(currentValue || amountInvested);
    if (isNaN(invested) || invested <= 0 || !name.trim()) return;
    onSubmit({
      name: name.trim(),
      type,
      amountInvested: invested,
      currentValue: isNaN(current) ? invested : current,
      date,
      ticker: ticker.trim().toUpperCase() || undefined,
      notes: notes.trim() || undefined,
    });
    setName("");
    setAmountInvested("");
    setCurrentValue("");
    setTicker("");
    setNotes("");
    setSelectedMatch(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative" ref={resultsRef}>
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-secondary">
            Investment Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g., Coca-Cola, Apple, Tesla..."
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowResults(true)}
              required
              className="w-full rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-sm text-ink transition-all duration-200 placeholder:text-tertiary focus:border-savings/40 focus:outline-none focus:bg-white"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="h-4 w-4 animate-spin text-tertiary" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {showResults && searchResults.length > 0 && (
          <div className="absolute z-20 left-0 right-0 mt-1 rounded-xl border border-border bg-white shadow-xl shadow-black/10 overflow-hidden animate-scale-in">
            <div className="px-3 py-2 border-b border-border">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-tertiary">Matching stocks</p>
            </div>
            {searchResults.map((match) => (
              <button
                key={match.symbol}
                type="button"
                onClick={() => handleSelectMatch(match)}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-surface-alt transition-colors text-left"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-invest-soft text-[10px] font-bold text-invest border border-invest/15">
                  {match.symbol.slice(0, 4)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-ink truncate">{match.name}</p>
                  <p className="text-[10px] text-tertiary">{match.symbol}</p>
                </div>
                <svg className="h-3.5 w-3.5 text-tertiary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>
        )}
      </div>

      {ticker && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-invest-soft border border-invest/15">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-invest/10 text-[9px] font-bold text-invest">
            {ticker.slice(0, 4)}
          </div>
          <p className="text-xs text-invest font-medium flex-1">
            Matched to <span className="font-bold">{ticker}</span> — live prices will be tracked
          </p>
          <button
            type="button"
            onClick={() => { setTicker(""); setSelectedMatch(null); }}
            className="text-invest/60 hover:text-invest transition-colors"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <div className="space-y-1.5">
        <label className="block text-xs font-semibold uppercase tracking-wider text-secondary">Type</label>
        <div className="grid grid-cols-3 gap-1.5">
          {INVESTMENT_TYPES.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setType(t.value)}
              className={`flex items-center gap-1.5 rounded-xl border p-2.5 text-xs font-medium transition-all duration-200 ${
                type === t.value
                  ? "border-savings/40 bg-savings-soft text-savings"
                  : "border-border text-secondary hover:border-border-hover"
              }`}
            >
              <span>{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <Input label="Amount Invested" type="number" placeholder="0" value={amountInvested} onChange={(e) => setAmountInvested(e.target.value)} required min="1" step="any" />
      <Input label="Current Value" type="number" placeholder="Same as invested" value={currentValue} onChange={(e) => setCurrentValue(e.target.value)} step="any" />
      <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <Input label="Notes (optional)" placeholder="Any details..." value={notes} onChange={(e) => setNotes(e.target.value)} />

      <div className="flex gap-2 pt-1">
        {onCancel && <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">Cancel</Button>}
        <Button type="submit" className="flex-1">Add Investment</Button>
      </div>
    </form>
  );
}
