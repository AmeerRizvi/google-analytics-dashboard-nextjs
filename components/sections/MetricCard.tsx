"use client";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {formatChange, formatNumber} from "@/utils/formatters";
import {ArrowDownIcon, ArrowUpIcon} from "lucide-react";
import {AnalyticsMetric} from "@/types/analytics";
import {motion} from "framer-motion";

interface MetricCardProps {
  metric: AnalyticsMetric;
  className?: string;
}

export function MetricCard({metric, className}: MetricCardProps) {
  const {name, value, change} = metric;

  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <motion.div
      whileHover={{scale: 1.02}}
      transition={{type: "spring", stiffness: 400, damping: 10}}
    >
      <Card
        className={`${className} overflow-hidden border-t-4 ${
          isPositive
            ? "border-t-green-500"
            : isNegative
            ? "border-t-red-500"
            : "border-t-primary"
        } shadow-md hover:shadow-lg transition-shadow`}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">{name}</CardTitle>
          {change !== undefined && (
            <div
              className={`flex items-center text-xs rounded-full px-2 py-1 ${
                isPositive
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : isNegative
                  ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              {isPositive && <ArrowUpIcon className="mr-1 h-3 w-3" />}
              {isNegative && <ArrowDownIcon className="mr-1 h-3 w-3" />}
              {formatChange(change)}
            </div>
          )}
        </CardHeader>
        <CardContent>
          <motion.div
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            className="text-4xl font-bold"
          >
            {typeof value === "number" ? formatNumber(value) : value}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
