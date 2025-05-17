"use client";

import {motion} from "framer-motion";
import {MapPin, Users} from "lucide-react";

export function EmptyState() {
  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5}}
      className="relative"
    >
      {/* Map placeholder with empty state */}
      <div className="relative z-0 bg-[#f8f8f8] h-[450px] rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 bg-background/80 backdrop-blur-sm p-8 rounded-lg shadow-sm">
            <div className="bg-primary/10 p-3 rounded-full">
              <MapPin className="h-8 w-8 text-primary/60" />
            </div>
            <div className="text-xl font-medium text-center">
              No user locations to display
            </div>
            <div className="text-muted-foreground text-center">
              User locations will appear here when people are active
            </div>
          </div>
        </div>
      </div>

      {/* Card placeholder with empty state */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 -mt-24">
        <div className="bg-card rounded-lg border shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Realtime Analytics</h2>
            <div className="text-sm text-muted-foreground">
              Updated just now
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary/5 p-6 rounded-lg border border-primary/10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-8 w-8 text-primary/60" />
                </div>
                <div className="text-lg font-medium">No active users</div>
                <div className="text-sm text-muted-foreground">
                  Check back soon for real-time user data
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-lg border border-primary/10 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="bg-primary/10 p-3 rounded-full">
                  <MapPin className="h-8 w-8 text-primary/60" />
                </div>
                <div className="text-lg font-medium">No user locations</div>
                <div className="text-sm text-muted-foreground">
                  User locations will appear when people are active
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
