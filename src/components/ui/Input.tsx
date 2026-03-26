import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wider text-secondary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "w-full rounded-xl border border-border bg-surface-alt px-4 py-2.5 text-sm text-ink transition-all duration-200 placeholder:text-tertiary focus:border-savings/40 focus:outline-none focus:bg-white",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
