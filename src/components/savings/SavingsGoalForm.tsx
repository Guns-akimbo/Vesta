"use client";

import { useState } from "react";
import { SAVINGS_ICONS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface SavingsGoalFormProps {
  onSubmit: (data: { name: string; targetAmount: number; deadline?: string; icon?: string }) => void;
  onCancel?: () => void;
}

export function SavingsGoalForm({ onSubmit, onCancel }: SavingsGoalFormProps) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [deadline, setDeadline] = useState("");
  const [icon, setIcon] = useState(SAVINGS_ICONS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(target);
    if (isNaN(amount) || amount <= 0 || !name.trim()) return;
    onSubmit({
      name: name.trim(),
      targetAmount: amount,
      deadline: deadline || undefined,
      icon,
    });
    setName("");
    setTarget("");
    setDeadline("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input label="Goal Name" placeholder="e.g., Emergency Fund" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input label="Target Amount" type="number" placeholder="0" value={target} onChange={(e) => setTarget(e.target.value)} required min="1" step="any" />
      <Input label="Deadline (optional)" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />

      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-secondary">Icon</label>
        <div className="flex flex-wrap gap-2">
          {SAVINGS_ICONS.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIcon(i)}
              className={`h-10 w-10 flex items-center justify-center rounded-xl text-lg transition-all duration-200 ${
                icon === i ? "bg-savings-soft ring-2 ring-savings/40 shadow-sm scale-110" : "bg-surface-alt border border-border hover:bg-white"
              }`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        {onCancel && <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">Cancel</Button>}
        <Button type="submit" className="flex-1">Create Goal</Button>
      </div>
    </form>
  );
}
