"use client";

import { useState } from "react";
import { Expense } from "@/types";
import { CATEGORY_MAP } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
  food: "bg-orange-100 text-orange-600",
  transport: "bg-invest-soft text-invest",
  entertainment: "bg-pink-100 text-pink-600",
  shopping: "bg-habit-soft text-habit",
  bills: "bg-surface-alt text-secondary",
  health: "bg-expense-soft text-expense",
  education: "bg-invest-soft text-invest",
  other: "bg-surface-alt text-secondary",
};

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

export function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  const [expanded, setExpanded] = useState(false);
  const cat = CATEGORY_MAP[expense.category];

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="group w-full flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-surface-alt -mx-1 text-left"
      >
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base ${CATEGORY_COLORS[expense.category] || "bg-surface-alt"}`}>
          {cat.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-ink truncate">{expense.description}</p>
          <p className="text-[11px] text-tertiary">{cat.label} · {formatDate(expense.date)}</p>
        </div>
        <p className="text-sm font-bold text-ink tabular-nums shrink-0">{formatCurrency(expense.amount)}</p>
        <svg className={`h-3.5 w-3.5 text-tertiary shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="ml-13 mr-1 mb-2 rounded-xl bg-surface-alt border border-border px-4 py-3 animate-scale-in">
          <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
            <div>
              <p className="text-tertiary">Amount</p>
              <p className="font-semibold text-ink">{formatCurrency(expense.amount)}</p>
            </div>
            <div>
              <p className="text-tertiary">Category</p>
              <p className="font-semibold text-ink">{cat.emoji} {cat.label}</p>
            </div>
            <div>
              <p className="text-tertiary">Date</p>
              <p className="font-semibold text-ink">{formatDate(expense.date)}</p>
            </div>
            <div>
              <p className="text-tertiary">Description</p>
              <p className="font-semibold text-ink">{expense.description}</p>
            </div>
          </div>
          <div className="mt-3 pt-2.5 border-t border-border flex justify-end">
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(expense.id); }}
              className="text-[11px] font-semibold text-expense hover:text-expense/80 transition-colors"
            >
              Delete expense
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
