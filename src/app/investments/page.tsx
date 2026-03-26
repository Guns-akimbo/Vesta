"use client";

import { useState } from "react";
import { useInvestments } from "@/hooks/useInvestments";
import { InvestmentForm } from "@/components/investments/InvestmentForm";
import { InvestmentList } from "@/components/investments/InvestmentList";
import { PortfolioSummary } from "@/components/investments/PortfolioSummary";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";

export default function InvestmentsPage() {
  const { isHydrated, addInvestment, updateInvestment, deleteInvestment, totalInvested, totalCurrentValue, totalPnL, pnlPercent, activeInvestments } = useInvestments();
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
          <h1 className="font-display text-3xl text-ink">Investments</h1>
          <p className="text-sm text-secondary mt-1">Track your portfolio</p>
        </div>
        <Button onClick={() => setShowForm(true)}>+ Add</Button>
      </div>

      <PortfolioSummary totalInvested={totalInvested} totalCurrentValue={totalCurrentValue} totalPnL={totalPnL} pnlPercent={pnlPercent} />

      <Card>
        <InvestmentList
          investments={activeInvestments}
          onDelete={deleteInvestment}
          onUpdateValue={(id, value) => updateInvestment(id, { currentValue: value })}
        />
      </Card>

      <Modal open={showForm} onClose={() => setShowForm(false)} title="Add Investment">
        <InvestmentForm onSubmit={(data) => { addInvestment(data); setShowForm(false); }} onCancel={() => setShowForm(false)} />
      </Modal>
    </div>
  );
}
