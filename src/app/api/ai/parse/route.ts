import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { text, habits } = await req.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const habitList = habits?.length
      ? habits.map((h: { id: string; name: string }) => `- "${h.name}" (id: ${h.id})`).join("\n")
      : "No habits created yet.";

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 256,
      messages: [
        {
          role: "user",
          content: `Parse this natural language input into structured data. The input is either an expense or a habit completion.

User's existing habits:
${habitList}

Input: "${text}"

Rules:
- For expenses: extract amount (number), category (one of: food, transport, entertainment, shopping, bills, health, education, other), and description
- For habit completions: match to an existing habit by name (fuzzy match OK), return the habit name and id
- Amounts with "k" mean thousands (e.g., "5k" = 5000)
- Default currency context is Nigerian Naira

Respond with ONLY valid JSON, no markdown fences:
For expense: {"type":"expense","amount":NUMBER,"category":"CATEGORY","description":"DESC"}
For habit: {"type":"habit_completion","habitName":"NAME","habitId":"ID"}
If you cannot parse the input, respond: {"type":"error","message":"reason"}`,
        },
      ],
    });

    const content = message.content[0];
    if (content.type !== "text") {
      return NextResponse.json({ error: "Unexpected response" }, { status: 500 });
    }

    const result = JSON.parse(content.text.trim());

    if (result.type === "error") {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("Parse error:", error);
    return NextResponse.json(
      { error: "Failed to parse input. Check your API key." },
      { status: 500 }
    );
  }
}
