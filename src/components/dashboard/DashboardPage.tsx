"use client";

import { useExpenses } from "@/hooks/useExpenses";
import { useHabits } from "@/hooks/useHabits";
import { useInvestments } from "@/hooks/useInvestments";
import { useSavings } from "@/hooks/useSavings";
import { useAi } from "@/hooks/useAi";
import { NetWorthCard } from "./NetWorthCard";
import { SpendingOverview } from "./SpendingOverview";
import { HabitOverview } from "./HabitOverview";
import { SavingsWidget } from "./SavingsWidget";
import { QuickActions } from "./QuickActions";
import { AiInputBar } from "@/components/ai/AiInputBar";
import { AiSummary } from "@/components/ai/AiSummary";
import { FinancialCalendar } from "./FinancialCalendar";
import { SpendingAnalysisChart } from "./SpendingAnalysisChart";
import { ExpenseCategory } from "@/types";

export function DashboardPage() {
  const { expenses, isHydrated: expHydrated, addExpense, todayTotal, weekTotal, monthTotal, categoryBreakdown } = useExpenses();
  const { habits, isHydrated: habHydrated, isCompleted, toggleCompletion, todayProgress } = useHabits();
  const { isHydrated: invHydrated, totalCurrentValue, totalPnL, pnlPercent } = useInvestments();
  const { goals, isHydrated: savHydrated, totalSaved, overallProgress } = useSavings();
  const { insight, isParsing, isLoadingInsights, parseError, parseInput } = useAi();

  const isHydrated = expHydrated && habHydrated && invHydrated && savHydrated;

  const handleParse = async (text: string) => parseInput(text, habits);
  const handleConfirmExpense = (data: { amount: number; category: ExpenseCategory; description: string }) => addExpense(data);
  const handleConfirmHabit = (habitId: string) => toggleCompletion(habitId);

  if (!isHydrated) {
    return (
      <div className="space-y-4">
        <div className="h-10 shimmer rounded-xl w-48" />
        <div className="h-44 shimmer rounded-2xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="h-48 shimmer rounded-2xl" />
          <div className="h-48 shimmer rounded-2xl" />
          <div className="h-48 shimmer rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header + Quick Actions row */}
      <div className="animate-fade-up flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs font-medium text-tertiary tracking-wide">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          <h1 className="font-display text-2xl sm:text-3xl text-ink mt-1">
            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"}
          </h1>
        </div>
        <QuickActions />
      </div>

      {/* AI Quick Entry */}
      <AiInputBar
        habits={habits}
        isParsing={isParsing}
        parseError={parseError}
        onParse={handleParse}
        onConfirmExpense={handleConfirmExpense}
        onConfirmHabit={handleConfirmHabit}
      />

      {/* Top row: Net Worth + Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <NetWorthCard
            totalInvestments={totalCurrentValue}
            totalSavings={totalSaved}
            monthExpenses={monthTotal}
            investmentPnL={totalPnL}
            pnlPercent={pnlPercent}
          />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <div className="rounded-2xl bg-white border border-border p-3 sm:p-4 animate-fade-up">
            <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-expense/70">Today&apos;s Spend</p>
            <p className="text-base sm:text-xl font-bold text-ink tabular-nums mt-1 truncate">{new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(todayTotal)}</p>
          </div>
          <div className="rounded-2xl bg-white border border-border p-3 sm:p-4 animate-fade-up stagger-1">
            <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-habit/70">Weekly Spend</p>
            <p className="text-base sm:text-xl font-bold text-ink tabular-nums mt-1 truncate">{new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(weekTotal)}</p>
          </div>
          <div className="rounded-2xl bg-white border border-border p-3 sm:p-4 animate-fade-up stagger-2">
            <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-savings/70">Savings Rate</p>
            <p className="text-base sm:text-xl font-bold text-ink tabular-nums mt-1">{overallProgress}%</p>
          </div>
          <div className="rounded-2xl bg-white border border-border p-3 sm:p-4 animate-fade-up stagger-3">
            <p className="text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-habit/70">Habit Streak</p>
            <p className="text-base sm:text-xl font-bold text-ink tabular-nums mt-1">{todayProgress}%</p>
            <p className="text-[10px] text-tertiary mt-0.5">today</p>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SpendingOverview todayTotal={todayTotal} weekTotal={weekTotal} monthTotal={monthTotal} categoryBreakdown={categoryBreakdown} />
        <HabitOverview habits={habits} todayProgress={todayProgress} isCompleted={isCompleted} onToggle={toggleCompletion} />
        <SpendingAnalysisChart expenses={expenses} totalSaved={totalSaved} />
        <SavingsWidget goals={goals} totalSaved={totalSaved} overallProgress={overallProgress} />
        <FinancialCalendar expenses={expenses} />
        <AiSummary content={insight?.content || null} isLoading={isLoadingInsights} />
      </div>
    </div>
  );
}
