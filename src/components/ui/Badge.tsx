import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "terra";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg px-2 py-0.5 text-[11px] font-semibold tracking-wide",
        variant === "default" && "bg-surface-alt text-secondary",
        variant === "success" && "bg-savings-soft text-savings",
        variant === "warning" && "bg-habit-soft text-habit",
        variant === "danger" && "bg-expense-soft text-expense",
        variant === "terra" && "bg-invest-soft text-invest",
        className
      )}
    >
      {children}
    </span>
  );
}
