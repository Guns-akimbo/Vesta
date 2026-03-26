import { NextRequest, NextResponse } from "next/server";

const FINNHUB_KEY = process.env.FINNHUB_API_KEY || "";

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol");

  if (!symbol) {
    return NextResponse.json({ error: "Symbol is required" }, { status: 400 });
  }

  if (!FINNHUB_KEY) {
    return NextResponse.json(
      { error: "Stock API not configured. Add FINNHUB_API_KEY to .env.local" },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(
      `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(symbol.toUpperCase())}&token=${FINNHUB_KEY}`,
      { next: { revalidate: 300 } } // cache for 5 minutes
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch quote" }, { status: 502 });
    }

    const data = await res.json();

    // Finnhub returns c=current, d=change, dp=percent change, h=high, l=low, pc=previous close
    if (!data.c || data.c === 0) {
      return NextResponse.json({ error: "Symbol not found" }, { status: 404 });
    }

    return NextResponse.json({
      symbol: symbol.toUpperCase(),
      price: data.c,
      change: data.d,
      changePercent: data.dp,
      high: data.h,
      low: data.l,
      previousClose: data.pc,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch stock data" }, { status: 500 });
  }
}
