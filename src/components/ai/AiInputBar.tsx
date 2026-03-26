"use client";

import { useState } from "react";
import { ParsedInput, Habit, ExpenseCategory } from "@/types";
import { Button } from "@/components/ui/Button";
import { CATEGORY_MAP } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

interface AiInputBarProps {
  habits?: Habit[];
  isParsing: boolean;
  parseError: string | null;
  onParse: (text: string) => Promise<ParsedInput | null>;
  onConfirmExpense: (data: {
    amount: number;
    category: ExpenseCategory;
    description: string;
  }) => void;
  onConfirmHabit: (habitId: string) => void;
}

export function AiInputBar({
  isParsing,
  parseError,
  onParse,
  onConfirmExpense,
  onConfirmHabit,
}: AiInputBarProps) {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<ParsedInput | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isParsing) return;
    const result = await onParse(input.trim());
    if (result) setParsed(result);
  };

  const handleConfirm = () => {
    if (!parsed) return;
    if (parsed.type === "expense") {
      onConfirmExpense({ amount: parsed.amount, category: parsed.category, description: parsed.description });
    } else if (parsed.type === "habit_completion" && parsed.habitId) {
      onConfirmHabit(parsed.habitId);
    }
    setParsed(null);
    setInput("");
  };

  return (
    <div className="rounded-2xl border border-border bg-white p-4 animate-fade-up">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-6 w-6 rounded-lg bg-savings-soft flex items-center justify-center">
          <svg className="h-3 w-3 text-savings" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="text-xs font-semibold text-secondary">Quick Entry</span>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Try "spent 5k on lunch"'
          className="flex-1 rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-sm text-ink placeholder:text-tertiary focus:border-savings/40 focus:outline-none transition-all duration-200"
        />
        <button
          type="submit"
          disabled={isParsing || !input.trim()}
          className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-xl bg-ink text-white transition-all duration-200 hover:opacity-85 active:scale-95 disabled:opacity-30"
        >
          {isParsing ? (
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </form>

      {parseError && <p className="mt-2 text-xs text-expense bg-expense-soft border border-expense/10 rounded-xl px-3 py-2">{parseError}</p>}

      {parsed && (
        <div className="mt-3 rounded-xl border border-border bg-surface-alt p-3.5 animate-scale-in">
          {parsed.type === "expense" ? (
            <div>
              <p className="text-sm font-semibold text-ink">
                {CATEGORY_MAP[parsed.category]?.emoji} {formatCurrency(parsed.amount)}
              </p>
              <p className="text-xs text-secondary mt-0.5">{parsed.description} · {CATEGORY_MAP[parsed.category]?.label}</p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-semibold text-ink">Habit: {parsed.habitName}</p>
              {!parsed.habitId && <p className="text-[11px] text-habit mt-0.5">Could not match to an existing habit</p>}
            </div>
          )}
          <div className="mt-2.5 flex gap-2">
            <Button size="sm" onClick={handleConfirm} disabled={parsed.type === "habit_completion" && !parsed.habitId}>Confirm</Button>
            <Button size="sm" variant="ghost" onClick={() => setParsed(null)}>Dismiss</Button>
          </div>
        </div>
      )}
    </div>
  );
}
