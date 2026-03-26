import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-bg disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97]",
        variant === "primary" &&
          "rounded-xl bg-ink text-white hover:opacity-85 focus:ring-ink/30",
        variant === "secondary" &&
          "rounded-xl bg-surface-alt text-ink hover:bg-border border border-border focus:ring-ink/10",
        variant === "danger" &&
          "rounded-xl bg-expense-soft text-expense hover:bg-expense-mid border border-expense/15 focus:ring-expense/20",
        variant === "ghost" &&
          "rounded-xl text-secondary hover:text-ink hover:bg-surface-alt focus:ring-ink/10",
        size === "sm" && "px-3.5 py-1.5 text-xs gap-1.5",
        size === "md" && "px-5 py-2.5 text-sm gap-2",
        size === "lg" && "px-7 py-3 text-base gap-2",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
