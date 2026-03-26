"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/",
    label: "Dashboard",
    icon: <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 12a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z" /></svg>,
  },
  {
    href: "/expenses",
    label: "Expenses",
    icon: <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  {
    href: "/habits",
    label: "Habits",
    icon: <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  {
    href: "/investments",
    label: "Investments",
    icon: <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  },
  {
    href: "/savings",
    label: "Savings",
    icon: <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-40 transition-all duration-200",
        "bg-white border-r border-border",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <div className={cn("flex items-center h-16 border-b border-border px-4", collapsed ? "justify-center" : "gap-3")}>
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-ink">
            <div className="w-4 h-4 border-2 border-bg rounded-full relative">
              <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-savings rounded-full border border-ink" />
            </div>
          </div>
          {!collapsed && (
            <span className="font-display text-lg text-ink tracking-tight">
              Vesta
            </span>
          )}
        </Link>
      </div>

      <nav className="flex-1 py-4 px-2.5 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200",
                collapsed && "justify-center px-2",
                active
                  ? "bg-surface-alt text-ink"
                  : "text-secondary hover:text-ink hover:bg-surface-alt"
              )}
              title={collapsed ? item.label : undefined}
            >
              <span className={active ? "text-ink" : ""}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
              {active && !collapsed && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-savings" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-2.5 pb-3 border-t border-border pt-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center justify-center w-full gap-2 rounded-xl px-3 py-2.5 text-[13px] font-medium text-tertiary hover:text-ink hover:bg-surface-alt transition-all duration-200"
        >
          <svg className={cn("h-3.5 w-3.5 transition-transform duration-200", collapsed && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
