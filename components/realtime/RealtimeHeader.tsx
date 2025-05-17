"use client";

import {motion} from "framer-motion";
import {formatRelativeTime} from "@/utils/formatters";
import {RefreshCw} from "lucide-react";

interface RealtimeHeaderProps {
  lastUpdated: Date | null;
  isRefreshing: boolean;
}

export function RealtimeHeader({
  lastUpdated,
  isRefreshing,
}: RealtimeHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {lastUpdated && <span>Updated {formatRelativeTime(lastUpdated)}</span>}
        <motion.div
          animate={{rotate: isRefreshing ? 360 : 0}}
          transition={{duration: 1, ease: "linear"}}
        >
          <RefreshCw
            className={`h-4 w-4 ${
              isRefreshing ? "text-primary" : "text-muted-foreground"
            }`}
          />
        </motion.div>
      </div>
    </div>
  );
}
