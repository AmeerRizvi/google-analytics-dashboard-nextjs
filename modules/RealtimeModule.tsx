"use client";

import {useEffect, useState, useRef} from "react";
import {motion} from "framer-motion";
import {RefreshCw, ExternalLink} from "lucide-react";
import {formatRelativeTime} from "@/utils/formatters";
import Image from "next/image";
import Link from "next/link";

// Import our components
import {ActiveUsersCard} from "@/components/realtime/ActiveUsersCard";
import {UserLocationsList} from "@/components/realtime/UserLocationsList";
import {UserLocationsMap} from "@/components/realtime/UserLocationsMap";
import {LoadingState} from "@/components/realtime/LoadingState";
import {ErrorState} from "@/components/realtime/ErrorState";
import {EmptyState} from "@/components/realtime/EmptyState";
import {RealtimeRow} from "@/types/analytics";

export function RealtimeModule() {
  const [data, setData] = useState<RealtimeRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsRefreshing(true);
        const response = await fetch("/api/ga/realtime");

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const realtimeData = await response.json();
        setData(realtimeData);
        setLoading(false);
        setLastUpdated(new Date());
      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setError("Failed to load analytics data. Please try again later.");
        setLoading(false);
      } finally {
        setIsRefreshing(false);
      }
    }

    fetchData();
    const intervalId = setInterval(fetchData, 30000);

    // Update the "last updated" text every minute
    refreshTimerRef.current = setInterval(() => {
      if (lastUpdated) {
        // Force a re-render to update the relative time
        setLastUpdated(new Date(lastUpdated));
      }
    }, 60000);

    return () => {
      clearInterval(intervalId);
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
    };
  }, []);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (data.length === 0) {
    return <EmptyState />;
  }

  const totalUsers = data.reduce((acc, row) => acc + row.activeUsers, 0);

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5}}
      className="relative"
    >
      {/* Map container with z-index 0 */}
      <div className="relative z-0">
        <UserLocationsMap data={data} />

        {/* Google Analytics logo in top right corner */}
        <Link
          href={
            process.env.NEXT_PUBLIC_ANALYTICS_URL ||
            "https://analytics.google.com"
          }
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 right-4 z-20 bg-white rounded-full px-4 shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center gap-2"
        >
          <Image src="/ga.svg" alt="Google Analytics" width={100} height={20} />
          <ExternalLink className="h-4 w-4 text-gray-500" />
        </Link>
      </div>

      {/* Combined card with higher z-index and negative margin to overlap */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 -mt-24">
        <div className="bg-card rounded-lg border shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Realtime</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {lastUpdated && (
                <span>Updated {formatRelativeTime(lastUpdated)}</span>
              )}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ActiveUsersCard
              totalUsers={totalUsers}
              countriesCount={data.length}
            />
            <UserLocationsList data={data} totalUsers={totalUsers} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
