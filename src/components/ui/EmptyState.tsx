export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-alt border border-border text-2xl">
        {icon}
      </div>
      <h3 className="font-display text-base text-ink mb-1">{title}</h3>
      <p className="text-xs text-secondary mb-5 max-w-[240px] leading-relaxed">{description}</p>
      {action}
    </div>
  );
}
