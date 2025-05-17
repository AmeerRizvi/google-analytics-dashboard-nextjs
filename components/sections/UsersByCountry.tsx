"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber } from "@/utils/formatters";

interface UsersByCountryProps {
  countries: Array<{
    country: string;
    users: number;
  }>;
  className?: string;
}

export function UsersByCountry({ countries, className }: UsersByCountryProps) {
  const totalUsers = countries.reduce((sum, country) => sum + country.users, 0);

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Users by Country</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {countries.map((country, index) => {
            const percentage = (country.users / totalUsers) * 100;
            
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{country.country}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatNumber(country.users)} ({percentage.toFixed(1)}%)
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-secondary">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
