"use client";

import { useState } from "react";
import { ExpenseCategory } from "@/types";
import { EXPENSE_CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getToday } from "@/lib/utils";

interface ExpenseFormProps {
  onSubmit: (data: {
    amount: number;
    category: ExpenseCategory;
    description: string;
    date: string;
  }) => void;
  onCancel?: () => void;
}

export function ExpenseForm({ onSubmit, onCancel }: ExpenseFormProps) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<ExpenseCategory>("food");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(getToday());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) return;
    onSubmit({ amount: num, category, description: description || category, date });
    setAmount("");
    setDescription("");
  };

  const uniqueCategories = EXPENSE_CATEGORIES.filter(
    (c, i, arr) => arr.findIndex((x) => x.value === c.value) === i
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Amount"
        type="number"
        placeholder="0"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
        min="1"
        step="any"
      />
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-secondary">
          Category
        </label>
        <div className="grid grid-cols-4 gap-2">
          {uniqueCategories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setCategory(cat.value)}
              className={`flex flex-col items-center gap-1.5 rounded-xl border-2 p-2.5 text-xs font-medium transition-all duration-200 ${
                category === cat.value
                  ? "border-savings/50 bg-savings-soft text-savings scale-[1.02]"
                  : "border-border text-secondary hover:border-border-hover hover:bg-surface-alt"
              }`}
            >
              <span className="text-lg">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </div>
      <Input
        label="Description"
        placeholder="What was this for?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <div className="flex gap-3 pt-1">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        )}
        <Button type="submit" className="flex-1">
          Add Expense
        </Button>
      </div>
    </form>
  );
}
