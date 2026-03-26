"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const ICONS = ["💪", "📚", "🏃", "🧘", "💧", "🎯", "✍️", "🛌", "🍎", "💊", "🎸", "🧹"];

interface HabitFormProps {
  onSubmit: (data: { name: string; icon?: string }) => void;
  onCancel?: () => void;
}

export function HabitForm({ onSubmit, onCancel }: HabitFormProps) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(ICONS[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit({ name: name.trim(), icon });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Habit Name"
        placeholder="e.g., Morning Run"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-secondary">
          Icon
        </label>
        <div className="flex flex-wrap gap-2">
          {ICONS.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIcon(i)}
              className={`h-11 w-11 flex items-center justify-center rounded-xl text-xl transition-all duration-200 ${
                icon === i
                  ? "bg-habit-soft ring-2 ring-habit/40 shadow-sm scale-110"
                  : "bg-surface-alt border border-border hover:bg-white"
              }`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-3 pt-1">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        )}
        <Button type="submit" className="flex-1">
          Add Habit
        </Button>
      </div>
    </form>
  );
}
