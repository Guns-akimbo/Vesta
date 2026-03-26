import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileHeader } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";

export const metadata: Metadata = {
  title: "Vesta — Smart Finance & Habits",
  description: "Track expenses, savings, investments, and habits in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="relative min-h-screen bg-bg">
          <Sidebar />
          <MobileHeader />
          <main className="lg:pl-60 transition-all duration-200">
            <div className="px-4 pt-16 pb-24 lg:px-8 lg:pt-6 lg:pb-8">
              {children}
            </div>
          </main>
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
