import { formatCurrency } from "@/lib/utils";

interface NetWorthCardProps {
  totalInvestments: number;
  totalSavings: number;
  monthExpenses: number;
  investmentPnL: number;
  pnlPercent: number;
}

export function NetWorthCard({
  totalInvestments,
  totalSavings,
  monthExpenses,
  investmentPnL,
  pnlPercent,
}: NetWorthCardProps) {
  const netWorth = totalInvestments + totalSavings;
  const pnlPositive = investmentPnL >= 0;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-ink p-6 animate-fade-up shadow-xl shadow-ink/10">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white/[0.04] to-transparent rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-savings/10 to-transparent rounded-full translate-y-1/2 -translate-x-1/4" />

      <div className="relative">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/40">
          Your net worth
        </p>
        <p className="mt-2 text-4xl font-bold text-white tabular-nums tracking-tight font-display">
          {formatCurrency(netWorth)}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-[10px] font-medium text-white/40 mb-1">Investments</p>
            <p className="text-base font-bold text-white tabular-nums">{formatCurrency(totalInvestments)}</p>
            <div className="flex items-center gap-1 mt-1">
              <svg className={`h-3 w-3 ${pnlPositive ? "text-savings-mid" : "text-expense-mid"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d={pnlPositive ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
              <span className={`text-xs font-semibold tabular-nums ${pnlPositive ? "text-savings-mid" : "text-expense-mid"}`}>
                {pnlPositive ? "+" : ""}{pnlPercent.toFixed(1)}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-medium text-white/40 mb-1">Savings</p>
            <p className="text-base font-bold text-white tabular-nums">{formatCurrency(totalSavings)}</p>
            <p className="text-[10px] text-white/30 mt-1">across goals</p>
          </div>
          <div>
            <p className="text-[10px] font-medium text-white/40 mb-1">This month</p>
            <p className="text-base font-bold text-expense-mid tabular-nums">-{formatCurrency(monthExpenses)}</p>
            <p className="text-[10px] text-white/30 mt-1">spent</p>
          </div>
        </div>
      </div>
    </div>
  );
}
