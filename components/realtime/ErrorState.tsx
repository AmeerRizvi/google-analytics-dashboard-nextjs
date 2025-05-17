"use client";

import {motion} from "framer-motion";
import {AlertTriangle, RefreshCw} from "lucide-react";
import {Button} from "@/components/ui/button";

interface ErrorStateProps {
  error: string;
}

export function ErrorState({error}: ErrorStateProps) {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5}}
      className="relative"
    >
      {/* Map placeholder with error state */}
      <div className="relative z-0 bg-[#f8f8f8] h-[450px] rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 bg-background/90 backdrop-blur-sm p-8 rounded-lg shadow-sm max-w-md">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <div className="text-xl font-medium text-center">
              Unable to load map data
            </div>
            <div className="text-muted-foreground text-center">{error}</div>
            <Button onClick={handleRefresh} className="mt-2">
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </div>

      {/* Card placeholder with error state */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 -mt-24">
        <div className="bg-card rounded-lg border shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Realtime Analytics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary/5 p-6 rounded-lg border border-primary/10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-center">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <div className="text-lg font-medium">Data unavailable</div>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg border border-primary/10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-center">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <div className="text-lg font-medium">Data unavailable</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
