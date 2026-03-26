"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface AiInsightsPanelProps {
  content: string | null;
  isLoading: boolean;
  error: string | null;
  lastGenerated: string | null;
  onRefresh: () => void;
}

export function AiInsightsPanel({
  content,
  isLoading,
  error,
  lastGenerated,
  onRefresh,
}: AiInsightsPanelProps) {
  return (
    <Card className="animate-fade-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-savings-soft">
            <svg className="h-4 w-4 text-savings" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h3 className="font-display text-lg text-ink">AI Insights</h3>
        </div>
        <Button size="sm" variant="ghost" onClick={onRefresh} disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Refresh"}
        </Button>
      </div>

      {error && (
        <p className="text-sm text-expense mb-3 bg-expense-soft border border-expense/10 rounded-xl px-3 py-2">{error}</p>
      )}

      {isLoading && !content && (
        <div className="space-y-3">
          <div className="h-3 shimmer rounded-full w-3/4" />
          <div className="h-3 shimmer rounded-full w-full" />
          <div className="h-3 shimmer rounded-full w-2/3" />
          <div className="h-3 shimmer rounded-full w-5/6" />
          <div className="h-3 shimmer rounded-full w-1/2" />
        </div>
      )}

      {content && (
        <div
          className="insight-prose"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
        />
      )}

      {lastGenerated && (
        <p className="mt-4 text-[11px] text-tertiary uppercase tracking-wider">
          Updated {new Date(lastGenerated).toLocaleString()}
        </p>
      )}

      {!content && !isLoading && (
        <div className="text-center py-6">
          <p className="font-display italic text-tertiary text-base mb-1">No insights yet</p>
          <p className="text-xs text-tertiary">Click Refresh to generate AI insights about your data.</p>
        </div>
      )}
    </Card>
  );
}

function renderMarkdown(md: string): string {
  return md
    .replace(/## (.+)/g, "<h2>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*<\/li>)/, "<ul>$1</ul>")
    .replace(/\n/g, "<br/>");
}
