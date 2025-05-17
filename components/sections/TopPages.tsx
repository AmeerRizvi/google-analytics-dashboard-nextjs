"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/utils/formatters";

interface TopPagesProps {
  pages: Array<{
    page: string;
    views: number;
  }>;
  className?: string;
}

export function TopPages({ pages, className }: TopPagesProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Top Pages</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pages.map((page, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="truncate max-w-[70%]" title={page.page}>
                <span className="text-sm font-medium">{index + 1}. </span>
                <span className="text-sm text-muted-foreground">{page.page}</span>
              </div>
              <div className="text-sm font-medium">{formatNumber(page.views)}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
