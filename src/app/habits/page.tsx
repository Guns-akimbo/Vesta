"use client";

import { useState } from "react";
import { useHabits } from "@/hooks/useHabits";
import { useAi } from "@/hooks/useAi";
import { useExpenses } from "@/hooks/useExpenses";
import { HabitForm } from "@/components/habits/HabitForm";
import { HabitList } from "@/components/habits/HabitList";
import { HabitCalendar } from "@/components/habits/HabitCalendar";
import { StreakDisplay } from "@/components/habits/StreakDisplay";
import { AiInsightsPanel } from "@/components/ai/AiInsightsPanel";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";

export default function HabitsPage() {
  const { habits, completions, isHydrated, addHabit, deleteHabit, toggleCompletion, isCompleted, getStreak, getCompletionRate, todayProgress, getCompletionsForMonth } = useHabits();
  const { expenses } = useExpenses();
  const { insight, isLoadingInsights, insightError, getInsights } = useAi();
  const [showForm, setShowForm] = useState(false);
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);

  const selectedHabit = habits.find((h) => h.id === selectedHabitId);
  const now = new Date();

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <div className="h-10 shimmer rounded-xl w-48" />
        <div className="h-24 shimmer rounded-2xl" />
        <div className="h-52 shimmer rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between animate-fade-up">
        <div>
          <h1 className="font-display text-3xl text-ink">Habits</h1>
          <p className="text-sm text-secondary mt-1">Build better routines</p>
        </div>
        <Button onClick={() => setShowForm(true)}>+ Add</Button>
      </div>

      <StreakDisplay todayProgress={todayProgress} totalHabits={habits.length} />

      <Card>
        <HabitList
          habits={habits}
          isCompleted={isCompleted}
          getStreak={getStreak}
          getCompletionRate={getCompletionRate}
          onToggle={(id) => toggleCompletion(id)}
          onDelete={deleteHabit}
        />
      </Card>

      {habits.length > 0 && (
        <Card className="animate-fade-up">
          <h3 className="font-display text-lg text-ink mb-4">Calendar View</h3>
          <div className="flex gap-1.5 mb-4 flex-wrap">
            {habits.map((h) => (
              <button
                key={h.id}
                onClick={() => setSelectedHabitId(h.id)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                  selectedHabitId === h.id
                    ? "bg-habit-soft text-habit border border-habit/20"
                    : "bg-surface-alt text-secondary border border-border hover:bg-white"
                }`}
              >
                {h.icon} {h.name}
              </button>
            ))}
          </div>
          {selectedHabit ? (
            <HabitCalendar
              completedDates={getCompletionsForMonth(selectedHabit.id, now.getFullYear(), now.getMonth())}
              onToggleDate={(date) => toggleCompletion(selectedHabit.id, date)}
            />
          ) : (
            <p className="text-xs text-tertiary text-center py-6 font-display italic">Select a habit to view its calendar</p>
          )}
        </Card>
      )}

      <AiInsightsPanel
        content={insight?.content || null}
        isLoading={isLoadingInsights}
        error={insightError}
        lastGenerated={insight?.generatedAt || null}
        onRefresh={() => getInsights(expenses, habits, completions, true)}
      />

      <Modal open={showForm} onClose={() => setShowForm(false)} title="Add Habit">
        <HabitForm onSubmit={(data) => { addHabit(data); setShowForm(false); }} onCancel={() => setShowForm(false)} />
      </Modal>
    </div>
  );
}
