"use client";

import Link from "next/link";

export function MobileHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/90 backdrop-blur-xl lg:hidden">
      <div className="flex h-14 items-center px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink">
            <div className="w-3.5 h-3.5 border-[1.5px] border-bg rounded-full relative">
              <div className="absolute -bottom-0.5 -right-0.5 w-[7px] h-[7px] bg-savings rounded-full border-[1.5px] border-ink" />
            </div>
          </div>
          <span className="font-display text-base text-ink tracking-tight">
            Vesta
          </span>
        </Link>
      </div>
    </header>
  );
}
