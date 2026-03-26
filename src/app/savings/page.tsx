"use client";

import { useState } from "react";
import { useSavings } from "@/hooks/useSavings";
import { SavingsGoalForm } from "@/components/savings/SavingsGoalForm";
import { SavingsGoalCard } from "@/components/savings/SavingsGoalCard";
import { SavingsOverview } from "@/components/savings/SavingsOverview";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/ui/EmptyState";

export default function SavingsPage() {
  const { goals, isHydrated, addGoal, deleteGoal, addTransaction, totalSaved, totalTarget, overallProgress } = useSavings();
  const [showForm, setShowForm] = useState(false);

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <div className="h-32 shimmer rounded-2xl" />
        <div className="h-52 shimmer rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl text-ink">Savings</h1>
          <p className="text-sm text-secondary mt-1">Reach your goals</p>
        </div>
        <Button onClick={() => setShowForm(true)}>+ New Goal</Button>
      </div>

      {goals.length > 0 && (
        <SavingsOverview totalSaved={totalSaved} totalTarget={totalTarget} overallProgress={overallProgress} goalCount={goals.length} />
      )}

      {goals.length === 0 ? (
        <EmptyState icon="🏦" title="No savings goals yet" description="Create your first savings goal to start building towards something great." action={<Button onClick={() => setShowForm(true)}>Create Goal</Button>} />
      ) : (
        <div className="space-y-3">
          {goals.map((goal, i) => (
            <div key={goal.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.04}s` }}>
              <SavingsGoalCard goal={goal} onAddFunds={addTransaction} onDelete={deleteGoal} />
            </div>
          ))}
        </div>
      )}

      <Modal open={showForm} onClose={() => setShowForm(false)} title="New Savings Goal">
        <SavingsGoalForm onSubmit={(data) => { addGoal(data); setShowForm(false); }} onCancel={() => setShowForm(false)} />
      </Modal>
    </div>
  );
}
