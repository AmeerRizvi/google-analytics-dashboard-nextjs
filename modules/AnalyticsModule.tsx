"use client";

import {useState, useEffect} from "react";
import {AnalyticsData, TimeRange} from "@/types/analytics";
import {MetricCard} from "../components/sections/MetricCard";
import {AnalyticsChart} from "../components/sections/AnalyticsChart";
import {TopPages} from "../components/sections/TopPages";
import {UsersByDevice} from "../components/sections/UsersByDevice";
import {TimeRangeSelector} from "../components/layout/TimeRangeSelector";
import {motion} from "framer-motion";
import {UsersByCountry} from "../components/sections/UsersByCountry";

export function AnalyticsModule() {
  const [timeRange, setTimeRange] = useState<TimeRange>("7days");
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/ga/overview?timeRange=${timeRange}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const analyticsData = await response.json();
        setData(analyticsData);
      } catch (err) {
        console.error("Error fetching analytics data:", err);
        setError("Failed to load analytics data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [timeRange]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Loading analytics data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">No analytics data available.</div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5}}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Overview</h2>
        <TimeRangeSelector value={timeRange} onChange={setTimeRange} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricCard metric={data.pageViews} />
        <MetricCard metric={data.users} />
        <MetricCard metric={data.sessions} />
        <MetricCard metric={data.bounceRate} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <MetricCard metric={data.newUsers} />
        <MetricCard metric={data.avgSessionDuration} />
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <AnalyticsChart title="Traffic Overview" data={data.dailyData} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TopPages pages={data.topPages} />
        <UsersByCountry countries={data.usersByCountry} />
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <UsersByDevice devices={data.usersByDevice} />
      </div>
    </motion.div>
  );
}
