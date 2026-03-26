"use client";

import { useState } from "react";
import { Investment } from "@/types";
import { INVESTMENT_TYPE_MAP } from "@/lib/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import { EmptyState } from "@/components/ui/EmptyState";
import { Badge } from "@/components/ui/Badge";

interface InvestmentListProps {
  investments: Investment[];
  onDelete: (id: string) => void;
  onUpdateValue?: (id: string, value: number) => void;
}

const TYPE_COLORS: Record<string, string> = {
  stocks: "bg-invest-soft text-invest",
  crypto: "bg-habit-soft text-habit",
  real_estate: "bg-blue-100 text-blue-600",
  bonds: "bg-surface-alt text-secondary",
  mutual_funds: "bg-purple-100 text-purple-600",
  other: "bg-surface-alt text-secondary",
};

function InvestmentRow({ inv, onDelete, onUpdateValue }: { inv: Investment; onDelete: (id: string) => void; onUpdateValue?: (id: string, value: number) => void }) {
  const [expanded, setExpanded] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editing, setEditing] = useState(false);
  const t = INVESTMENT_TYPE_MAP[inv.type];
  const pnl = inv.currentValue - inv.amountInvested;
  const pnlPct = inv.amountInvested > 0 ? ((pnl / inv.amountInvested) * 100) : 0;
  const isPositive = pnl >= 0;

  const handleUpdateValue = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(editValue);
    if (!isNaN(num) && num >= 0 && onUpdateValue) {
      onUpdateValue(inv.id, num);
      setEditing(false);
      setEditValue("");
    }
  };

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        className="group w-full flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 hover:bg-surface-alt -mx-1 text-left"
      >
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-base ${TYPE_COLORS[inv.type] || "bg-surface-alt"}`}>
          {t.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-ink truncate">{inv.name}</p>
          <div className="flex items-center gap-1.5">
            {inv.ticker && <span className="text-[11px] font-semibold text-invest">{inv.ticker.toUpperCase()}</span>}
            {inv.ticker && <span className="text-tertiary">·</span>}
            <span className="text-[11px] text-tertiary">{t.label}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-sm font-bold text-ink tabular-nums">{formatCurrency(inv.currentValue)}</p>
          <Badge variant={isPositive ? "success" : "danger"}>
            {isPositive ? "+" : ""}{pnlPct.toFixed(1)}%
          </Badge>
        </div>
        <svg className={`h-3.5 w-3.5 text-tertiary shrink-0 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="ml-2 sm:ml-13 mr-1 mb-2 rounded-xl bg-surface-alt border border-border px-3 sm:px-4 py-3 animate-scale-in">
          <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
            <div>
              <p className="text-tertiary">Invested</p>
              <p className="font-semibold text-ink">{formatCurrency(inv.amountInvested)}</p>
            </div>
            <div>
              <p className="text-tertiary">Current Value</p>
              <p className="font-semibold text-ink">{formatCurrency(inv.currentValue)}</p>
            </div>
            <div>
              <p className="text-tertiary">P&L</p>
              <p className={`font-semibold ${isPositive ? "text-savings" : "text-expense"}`}>
                {isPositive ? "+" : ""}{formatCurrency(pnl)} ({isPositive ? "+" : ""}{pnlPct.toFixed(1)}%)
              </p>
            </div>
            <div>
              <p className="text-tertiary">Type</p>
              <p className="font-semibold text-ink">{t.emoji} {t.label}</p>
            </div>
            <div>
              <p className="text-tertiary">Date</p>
              <p className="font-semibold text-ink">{formatDate(inv.date)}</p>
            </div>
            <div>
              <p className="text-tertiary">Status</p>
              <p className="font-semibold text-ink capitalize">{inv.status}</p>
            </div>
            {inv.ticker && (
              <div>
                <p className="text-tertiary">Ticker</p>
                <p className="font-semibold text-ink">{inv.ticker.toUpperCase()}</p>
              </div>
            )}
            {inv.notes && (
              <div className="col-span-2">
                <p className="text-tertiary">Notes</p>
                <p className="font-semibold text-ink">{inv.notes}</p>
              </div>
            )}
          </div>

          <div className="mt-3 pt-2.5 border-t border-border flex items-center justify-between gap-2">
            {!editing ? (
              <button
                onClick={(e) => { e.stopPropagation(); setEditing(true); setEditValue(inv.currentValue.toString()); }}
                className="text-[11px] font-semibold text-invest hover:text-invest/80 transition-colors"
              >
                Update value
              </button>
            ) : (
              <form onSubmit={handleUpdateValue} className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                <input
                  type="number"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-24 rounded-lg border border-border bg-white px-2.5 py-1.5 text-xs text-ink focus:border-savings/40 focus:outline-none"
                  autoFocus
                  step="any"
                />
                <button type="submit" className="text-[11px] font-semibold text-savings">Save</button>
                <button type="button" onClick={() => setEditing(false)} className="text-[11px] text-tertiary">Cancel</button>
              </form>
            )}
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(inv.id); }}
              className="text-[11px] font-semibold text-expense hover:text-expense/80 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function InvestmentList({ investments, onDelete, onUpdateValue }: InvestmentListProps) {
  if (investments.length === 0) {
    return (
      <EmptyState
        icon="📈"
        title="No investments yet"
        description="Start tracking your portfolio by adding your first investment."
      />
    );
  }

  return (
    <div className="divide-y divide-border">
      {investments.map((inv, i) => (
        <div key={inv.id} className="animate-fade-up" style={{ animationDelay: `${i * 0.03}s` }}>
          <InvestmentRow inv={inv} onDelete={onDelete} onUpdateValue={onUpdateValue} />
        </div>
      ))}
    </div>
  );
}
