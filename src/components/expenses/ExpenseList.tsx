"use client";

import { Expense } from "@/types";
import { ExpenseItem } from "./ExpenseItem";
import { EmptyState } from "@/components/ui/EmptyState";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <EmptyState
        icon="💸"
        title="No expenses yet"
        description="Start tracking your spending by adding your first expense."
      />
    );
  }

  return (
    <div className="divide-y divide-border">
      {expenses.map((expense, i) => (
        <div
          key={expense.id}
          className="animate-fade-up"
          style={{ animationDelay: `${i * 0.04}s` }}
        >
          <ExpenseItem expense={expense} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
