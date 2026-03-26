"use client";

import { useState } from "react";
import { useExpenses } from "@/hooks/useExpenses";
import { ExpenseForm } from "@/components/expenses/ExpenseForm";
import { ExpenseList } from "@/components/expenses/ExpenseList";
import { SummaryCards } from "@/components/expenses/SummaryCards";
import { SpendingChart } from "@/components/expenses/SpendingChart";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Tabs } from "@/components/ui/Tabs";

export default function ExpensesPage() {
  const { isHydrated, addExpense, deleteExpense, todayTotal, weekTotal, monthTotal, categoryBreakdown, recentExpenses } = useExpenses();
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("list");

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
          <h1 className="font-display text-2xl sm:text-3xl text-ink">Expenses</h1>
          <p className="text-sm text-secondary mt-1">Track your spending</p>
        </div>
        <Button onClick={() => setShowForm(true)}>+ Add</Button>
      </div>

      <SummaryCards todayTotal={todayTotal} weekTotal={weekTotal} monthTotal={monthTotal} />

      <Tabs
        tabs={[
          { value: "list", label: "Recent" },
          { value: "chart", label: "Breakdown" },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <Card>
        {activeTab === "list" ? (
          <ExpenseList expenses={recentExpenses} onDelete={deleteExpense} />
        ) : (
          <SpendingChart categoryBreakdown={categoryBreakdown} />
        )}
      </Card>

      <Modal open={showForm} onClose={() => setShowForm(false)} title="Add Expense">
        <ExpenseForm onSubmit={(data) => { addExpense(data); setShowForm(false); }} onCancel={() => setShowForm(false)} />
      </Modal>
    </div>
  );
}
