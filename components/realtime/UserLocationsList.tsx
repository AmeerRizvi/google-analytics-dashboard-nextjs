"use client";

import {motion} from "framer-motion";
import {formatNumber} from "@/utils/formatters";
import {MapPin} from "lucide-react";
import {RealtimeRow} from "@/types/analytics";

interface UserLocationsListProps {
  data: RealtimeRow[];
  totalUsers: number;
}

export function UserLocationsList({data, totalUsers}: UserLocationsListProps) {
  // Colors for the progress bars
  const COLORS = [
    "var(--chart-1, #2563eb)",
    "var(--chart-2, #8b5cf6)",
    "var(--chart-3, #ec4899)",
    "var(--chart-4, #f97316)",
    "var(--chart-5, #14b8a6)",
  ];

  return (
    <div className="bg-primary/5 p-6 rounded-lg border border-primary/10">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          User Locations
        </h3>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
        {data.map((row, idx) => {
          const percentage = (row.activeUsers / totalUsers) * 100;
          return (
            <motion.div
              key={idx}
              className="flex flex-col gap-1 border-b border-border pb-2"
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: idx * 0.05}}
              whileHover={{x: 2}}
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{row.country}</span>
                <span className="font-semibold text-primary">
                  {formatNumber(row.activeUsers)}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: COLORS[idx % COLORS.length],
                  }}
                  initial={{width: 0}}
                  animate={{width: `${percentage}%`}}
                  transition={{duration: 0.8, delay: idx * 0.05}}
                />
              </div>
              <div className="text-xs text-muted-foreground text-right">
                {percentage.toFixed(1)}%
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
