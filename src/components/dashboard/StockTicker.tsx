"use client";

import { StockQuote, Investment } from "@/types";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

const DEFAULT_STOCKS = [
  { symbol: "AAPL", name: "Apple Inc." },
  { symbol: "GOOGL", name: "Alphabet Inc." },
  { symbol: "TSLA", name: "Tesla Inc." },
  { symbol: "MSFT", name: "Microsoft Corp." },
  { symbol: "AMZN", name: "Amazon.com" },
];

interface StockTickerProps {
  investments: Investment[];
  quotes: Record<string, StockQuote>;
  isLoading: boolean;
}

export function StockTicker({ investments, quotes, isLoading }: StockTickerProps) {
  const tickerInvestments = investments.filter((inv) => inv.ticker);
  const userTickers = new Set(tickerInvestments.map((inv) => inv.ticker!.toUpperCase()));
  const displayItems: { symbol: string; name: string; isOwned: boolean; investedAmount?: number; currentValue?: number }[] = [];

  tickerInvestments.forEach((inv) => {
    displayItems.push({
      symbol: inv.ticker!.toUpperCase(),
      name: inv.name,
      isOwned: true,
      investedAmount: inv.amountInvested,
      currentValue: inv.currentValue,
    });
  });

  for (const stock of DEFAULT_STOCKS) {
    if (displayItems.length >= 6) break;
    if (!userTickers.has(stock.symbol)) {
      displayItems.push({ symbol: stock.symbol, name: stock.name, isOwned: false });
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-white p-5 animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-invest-soft flex items-center justify-center">
            <svg className="h-4 w-4 text-invest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-ink">Market Watch</h3>
        </div>
        <div className="flex items-center gap-2">
          {isLoading && <div className="h-2 w-2 rounded-full bg-savings animate-pulse-soft" />}
          <Link href="/investments" className="text-[11px] font-medium text-savings hover:text-savings/80 transition-colors">Invest</Link>
        </div>
      </div>

      <div className="space-y-0.5">
        {displayItems.map((item) => {
          const quote = quotes[item.symbol];
          const isUp = quote ? quote.change >= 0 : true;

          return (
            <div key={item.symbol} className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-surface-alt transition-colors -mx-1">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold border ${
                item.isOwned
                  ? "bg-invest-soft text-invest border-invest/15"
                  : "bg-surface-alt text-secondary border-border"
              }`}>
                {item.symbol.slice(0, 4)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-xs font-medium text-ink truncate">{item.name}</p>
                  {item.isOwned && (
                    <span className="text-[8px] font-bold uppercase tracking-wider bg-savings-soft text-savings px-1.5 py-0.5 rounded-md shrink-0">Owned</span>
                  )}
                </div>
                <p className="text-[10px] text-tertiary">
                  {item.symbol}
                  {item.isOwned && item.investedAmount ? ` · Invested ${formatCurrency(item.investedAmount)}` : ""}
                </p>
              </div>
              <div className="text-right shrink-0">
                {quote ? (
                  <>
                    <p className="text-xs font-bold text-ink tabular-nums">${quote.price.toFixed(2)}</p>
                    <div className={`flex items-center justify-end gap-0.5 ${isUp ? "text-savings" : "text-expense"}`}>
                      <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={isUp ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                      </svg>
                      <span className="text-[10px] font-semibold tabular-nums">{isUp ? "+" : ""}{quote.changePercent.toFixed(2)}%</span>
                    </div>
                  </>
                ) : isLoading ? (
                  <div className="space-y-1"><div className="h-3 w-12 shimmer rounded" /><div className="h-2.5 w-8 shimmer rounded ml-auto" /></div>
                ) : (
                  <p className="text-[10px] text-tertiary">--</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
