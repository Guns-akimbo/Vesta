import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { expenses, habits, completions } = await req.json();

    const expenseSummary = expenses?.length
      ? expenses
          .slice(0, 50)
          .map(
            (e: { date: string; amount: number; category: string; description: string }) =>
              `${e.date}: ${e.amount} NGN on ${e.category} (${e.description})`
          )
          .join("\n")
      : "No expenses recorded.";

    const habitSummary = habits?.length
      ? habits
          .map((h: { id: string; name: string }) => {
            const hCompletions = completions?.filter(
              (c: { habitId: string; completed: boolean }) =>
                c.habitId === h.id && c.completed
            );
            return `- "${h.name}": ${hCompletions?.length || 0} completions`;
          })
          .join("\n")
      : "No habits tracked.";

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: `Analyze this user's spending and habit data from the last 30 days. Provide brief, actionable insights.

EXPENSES:
${expenseSummary}

HABITS:
${habitSummary}

Provide insights in markdown format with these sections:
## Spending Trends
(2-3 bullet points about spending patterns)

## Habit Streaks
(2-3 bullet points about habit consistency)

## Suggestions
(2-3 actionable tips)

Keep it concise and encouraging. Use the Nigerian Naira context for amounts.`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "Unexpected response" }, { status: 500 });
    }

    return NextResponse.json({ insights: content.text });
  } catch (error) {
    console.error("Insights error:", error);
    return NextResponse.json(
      { error: "Failed to generate insights. Check your API key." },
      { status: 500 }
    );
  }
}
