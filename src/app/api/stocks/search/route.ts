import { NextRequest, NextResponse } from "next/server";

const FINNHUB_KEY = process.env.FINNHUB_API_KEY || "";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ results: [] });
  }

  if (!FINNHUB_KEY) {
    return NextResponse.json(
      { error: "Stock API not configured" },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/search?q=${encodeURIComponent(query)}&token=${FINNHUB_KEY}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Search failed" }, { status: 502 });
    }

    const data = await res.json();

    // Filter to only common stocks (not crypto, forex, etc.) and limit to 6 results
    const results = (data.result || [])
      .filter((item: { type: string; symbol: string }) =>
        item.type === "Common Stock" && !item.symbol.includes(".")
      )
      .slice(0, 6)
      .map((item: { symbol: string; description: string }) => ({
        symbol: item.symbol,
        name: item.description,
      }));

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
