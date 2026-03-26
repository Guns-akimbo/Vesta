"use client";

import Link from "next/link";

const actions = [
  {
    href: "/expenses",
    label: "Add Expense",
    icon: <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" /></svg>,
    color: "bg-expense-soft border-expense/10 text-expense hover:border-expense/25",
  },
  {
    href: "/habits",
    label: "Log Habit",
    icon: <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>,
    color: "bg-habit-soft border-habit/10 text-habit hover:border-habit/25",
  },
  {
    href: "/investments",
    label: "Invest",
    icon: <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    color: "bg-invest-soft border-invest/10 text-invest hover:border-invest/25",
  },
  {
    href: "/savings",
    label: "Save",
    icon: <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" /></svg>,
    color: "bg-savings-soft border-savings/10 text-savings hover:border-savings/25",
  },
];

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <Link
          key={action.href}
          href={action.href}
          className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${action.color}`}
        >
          {action.icon}
          {action.label}
        </Link>
      ))}
    </div>
  );
}
