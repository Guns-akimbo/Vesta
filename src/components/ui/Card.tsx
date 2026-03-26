import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  hover = false,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-white p-5",
        hover && "transition-all duration-200 hover:border-border-hover hover:-translate-y-0.5 hover:shadow-md hover:shadow-black/5",
        className
      )}
    >
      {children}
    </div>
  );
}
