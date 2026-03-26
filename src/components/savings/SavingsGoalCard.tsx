"use client";

import { useState } from "react";
import { SavingsGoal } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface SavingsGoalCardProps {
  goal: SavingsGoal;
  onAddFunds: (goalId: string, amount: number, note?: string) => void;
  onDelete: (id: string) => void;
}

export function SavingsGoalCard({ goal, onAddFunds, onDelete }: SavingsGoalCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [amount, setAmount] = useState("");
  const progress = goal.targetAmount > 0 ? Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100)) : 0;
  const isComplete = progress >= 100;
  const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (isNaN(num) || num === 0) return;
    onAddFunds(goal.id, num);
    setAmount("");
    setShowDeposit(false);
  };

  return (
    <div className="rounded-2xl border border-border bg-white p-4 sm:p-5 transition-all duration-200">
      <button onClick={() => setExpanded(!expanded)} className="w-full text-left">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-savings-soft text-lg">
              {goal.icon || "🎯"}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{goal.name}</p>
              {goal.deadline && (
                <p className="text-[10px] text-tertiary">Due {new Date(goal.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className={`text-xs font-bold tabular-nums px-2 py-0.5 rounded-lg ${isComplete ? "bg-savings-soft text-savings" : "bg-habit-soft text-habit"}`}>{progress}%</span>
            <svg className={`h-3.5 w-3.5 text-tertiary transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex-1 h-2 rounded-full bg-surface-alt overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-700 ${isComplete ? "bg-savings" : "bg-habit"}`} style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[10px] sm:text-[11px] text-secondary tabular-nums shrink-0 hidden sm:inline">{formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}</span>
          <span className="text-[10px] text-secondary tabular-nums shrink-0 sm:hidden">{formatCurrency(goal.currentAmount)}</span>
        </div>
      </button>

      {expanded && (
        <div className="mt-4 pt-3 border-t border-border animate-scale-in">
          <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs mb-3">
            <div>
              <p className="text-tertiary">Saved so far</p>
              <p className="font-semibold text-ink">{formatCurrency(goal.currentAmount)}</p>
            </div>
            <div>
              <p className="text-tertiary">Remaining</p>
              <p className="font-semibold text-ink">{formatCurrency(remaining)}</p>
            </div>
            <div>
              <p className="text-tertiary">Target</p>
              <p className="font-semibold text-ink">{formatCurrency(goal.targetAmount)}</p>
            </div>
            {goal.deadline && (
              <div>
                <p className="text-tertiary">Deadline</p>
                <p className="font-semibold text-ink">{new Date(goal.deadline).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            {!showDeposit ? (
              <Button size="sm" variant="secondary" onClick={() => setShowDeposit(true)}>+ Add Funds</Button>
            ) : (
              <form onSubmit={handleDeposit} className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount"
                  className="w-24 rounded-lg border border-border bg-surface-alt px-2.5 py-1.5 text-xs text-ink focus:border-savings/40 focus:outline-none"
                  autoFocus
                />
                <Button size="sm" type="submit">Save</Button>
                <button type="button" onClick={() => setShowDeposit(false)} className="text-[11px] text-tertiary hover:text-ink">Cancel</button>
              </form>
            )}
            <button onClick={() => onDelete(goal.id)} className="text-[11px] font-semibold text-expense hover:text-expense/80 transition-colors">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
