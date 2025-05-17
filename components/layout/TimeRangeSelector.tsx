"use client";

import { TimeRange } from "@/types/analytics";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TimeRangeSelectorProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
  className?: string;
}

export function TimeRangeSelector({
  value,
  onChange,
  className,
}: TimeRangeSelectorProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(value) => onChange(value as TimeRange)}
      className={className}
    >
      <TabsList>
        <TabsTrigger value="7days">Last 7 Days</TabsTrigger>
        <TabsTrigger value="30days">Last 30 Days</TabsTrigger>
        <TabsTrigger value="90days">Last 90 Days</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
