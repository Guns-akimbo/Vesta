"use client";

interface AiSummaryProps {
  content: string | null;
  isLoading: boolean;
}

export function AiSummary({ content, isLoading }: AiSummaryProps) {
  if (!content && !isLoading) return null;

  return (
    <div className="rounded-2xl border border-border bg-white p-5 animate-fade-up">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-8 w-8 rounded-xl bg-savings-soft flex items-center justify-center">
          <svg className="h-4 w-4 text-savings" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-ink">AI Summary</h3>
      </div>
      {isLoading ? (
        <div className="space-y-2">
          <div className="h-3 shimmer rounded w-3/4" />
          <div className="h-3 shimmer rounded w-full" />
          <div className="h-3 shimmer rounded w-1/2" />
        </div>
      ) : (
        <p className="text-sm text-secondary leading-relaxed">
          {content?.split("\n").slice(0, 3).join(" ").slice(0, 250)}
          {(content?.length || 0) > 250 ? "..." : ""}
        </p>
      )}
    </div>
  );
}
