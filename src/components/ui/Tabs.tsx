"use client";

import { cn } from "@/lib/utils";

export function Tabs({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: { value: string; label: string }[];
  activeTab: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex gap-1 rounded-xl bg-surface-alt p-1 border border-border">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "relative flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
            activeTab === tab.value
              ? "bg-white text-ink shadow-sm shadow-black/5"
              : "text-tertiary hover:text-secondary"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
