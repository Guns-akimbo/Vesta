import { formatCurrency } from "@/lib/utils";

interface PortfolioSummaryProps {
  totalInvested: number;
  totalCurrentValue: number;
  totalPnL: number;
  pnlPercent: number;
}

export function PortfolioSummary({ totalInvested, totalCurrentValue, totalPnL, pnlPercent }: PortfolioSummaryProps) {
  const isPositive = totalPnL >= 0;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-invest p-6 animate-fade-up shadow-xl shadow-invest/10">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-white/[0.06] to-transparent rounded-full -translate-y-1/3 translate-x-1/4" />

      <div className="relative">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">Portfolio Value</p>
        <p className="mt-2 text-4xl font-bold text-white tabular-nums tracking-tight font-display">{formatCurrency(totalCurrentValue)}</p>

        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-[10px] font-medium text-white/40">Invested</p>
            <p className="text-base font-bold text-white/80 tabular-nums mt-0.5">{formatCurrency(totalInvested)}</p>
          </div>
          <div>
            <p className="text-[10px] font-medium text-white/40">P&L</p>
            <p className={`text-base font-bold tabular-nums mt-0.5 ${isPositive ? "text-savings-mid" : "text-expense-mid"}`}>
              {isPositive ? "+" : ""}{formatCurrency(totalPnL)}
              <span className="ml-1.5 text-xs opacity-80">({isPositive ? "+" : ""}{pnlPercent.toFixed(1)}%)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
