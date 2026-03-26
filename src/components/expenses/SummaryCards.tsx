import { formatCurrency } from "@/lib/utils";

interface SummaryCardsProps {
  todayTotal: number;
  weekTotal: number;
  monthTotal: number;
}

export function SummaryCards({ todayTotal, weekTotal, monthTotal }: SummaryCardsProps) {
  const cards = [
    { label: "Today", value: todayTotal, bg: "bg-expense-soft", border: "border-expense/10", text: "text-expense" },
    { label: "This Week", value: weekTotal, bg: "bg-habit-soft", border: "border-habit/10", text: "text-habit" },
    { label: "This Month", value: monthTotal, bg: "bg-surface-alt", border: "border-border", text: "text-ink" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {cards.map((card, i) => (
        <div
          key={card.label}
          className={`animate-fade-up rounded-2xl border ${card.border} ${card.bg} p-3 sm:p-4 transition-all duration-200 hover:-translate-y-0.5`}
          style={{ animationDelay: `${i * 0.08}s` }}
        >
          <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-secondary">{card.label}</p>
          <p className="mt-1.5 text-base sm:text-xl font-bold tabular-nums text-ink truncate">
            {formatCurrency(card.value)}
          </p>
        </div>
      ))}
    </div>
  );
}
