"use client";

import {ThemeToggle} from "@/components/theme/ThemeToggle";
import {BarChart3} from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-row items-center justify-center">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">
              Google Analytics Dashboard
            </span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              Nextjs
            </span>
          </Link>
        </div>
        <nav className="flex items-center gap-6">
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
