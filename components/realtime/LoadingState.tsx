"use client";

import {motion} from "framer-motion";
import {RefreshCw} from "lucide-react";

export function LoadingState() {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5}}
      className="relative"
    >
      {/* Map placeholder with loading state */}
      <div className="relative z-0 bg-[#f8f8f8] h-[450px] rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 bg-background/80 backdrop-blur-sm p-8 rounded-lg shadow-sm">
            <motion.div
              animate={{rotate: 360}}
              transition={{duration: 2, repeat: Infinity, ease: "linear"}}
            >
              <RefreshCw className="h-10 w-10 text-primary" />
            </motion.div>
            <div className="text-xl font-medium">Loading map data...</div>
          </div>
        </div>
      </div>

      {/* Card placeholder with loading state */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 -mt-24">
        <div className="bg-card rounded-lg border shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="h-8 w-48 bg-muted/50 rounded animate-pulse"></div>
            <div className="h-5 w-32 bg-muted/50 rounded animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary/5 p-6 rounded-lg border border-primary/10 h-[200px] flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-16 w-16 bg-muted/50 rounded-full animate-pulse"></div>
                <div className="h-6 w-32 bg-muted/50 rounded animate-pulse"></div>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg border border-primary/10 h-[200px]">
              <div className="h-6 w-32 bg-muted/50 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-5 w-24 bg-muted/50 rounded animate-pulse"></div>
                    <div className="h-5 w-12 bg-muted/50 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
