"use client";

import {motion, AnimatePresence} from "framer-motion";
import {formatNumber} from "@/utils/formatters";
import {Users} from "lucide-react";

interface ActiveUsersCardProps {
  totalUsers: number;
  countriesCount: number;
}

export function ActiveUsersCard({
  totalUsers,
  countriesCount,
}: ActiveUsersCardProps) {
  return (
    <motion.div
      className="bg-primary/5 p-6 rounded-lg border border-primary/10"
      whileHover={{scale: 1.01}}
      transition={{type: "spring", stiffness: 400, damping: 10}}
    >
      <div className="flex items-center gap-2 mb-2">
        <Users className="h-5 w-5 text-primary" />
        <h3 className="text-xl font-semibold">Active Users</h3>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={totalUsers}
          initial={{opacity: 0, y: -10}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: 10}}
          className="text-4xl font-bold text-primary"
        >
          {formatNumber(totalUsers)}
        </motion.div>
      </AnimatePresence>
      <p className="text-sm text-muted-foreground mt-2">
        Users across {countriesCount} country
        {countriesCount > 1 ? "ies" : ""}
      </p>
    </motion.div>
  );
}
