import {AnalyticsData, Row} from "@/types/analytics";
import {formatDate, formatDuration} from "@/utils/formatters";

export function processAnalyticsData(
  currentMetrics: any[],
  previousMetrics: any[],
  topPagesRows: any[],
  usersByCountryRows: any[],
  usersByDeviceRows: any[],
  dailyDataRows: any[]
): AnalyticsData {
  // Calculate changes
  const calculateChange = (current: string, previous: string): number => {
    const currentValue = parseFloat(current);
    const previousValue = parseFloat(previous);
    if (previousValue === 0) return 0;
    return ((currentValue - previousValue) / previousValue) * 100;
  };

  // Format top pages
  const topPages = topPagesRows.map((row: Row) => ({
    page: row.dimensionValues?.[0].value || "",
    views: parseInt(row.metricValues?.[0].value || "0"),
  }));

  // Format users by country
  const usersByCountry = usersByCountryRows.map((row: Row) => ({
    country: row.dimensionValues?.[0].value || "",
    users: parseInt(row.metricValues?.[0].value || "0"),
  }));

  // Format users by device
  const usersByDevice = usersByDeviceRows.map((row: Row) => ({
    device: row.dimensionValues?.[0].value || "",
    users: parseInt(row.metricValues?.[0].value || "0"),
  }));

  // Format daily data
  const dailyData = dailyDataRows.map((row: Row) => ({
    date: formatDate(row.dimensionValues?.[0].value || ""),
    pageViews: parseInt(row.metricValues?.[0].value || "0"),
    users: parseInt(row.metricValues?.[1].value || "0"),
  }));

  return {
    pageViews: {
      name: "Page Views",
      value: parseInt(currentMetrics[0]?.value || "0"),
      previousValue: parseInt(previousMetrics[0]?.value || "0"),
      change: calculateChange(
        currentMetrics[0]?.value || "0",
        previousMetrics[0]?.value || "0"
      ),
    },
    users: {
      name: "Users",
      value: parseInt(currentMetrics[1]?.value || "0"),
      previousValue: parseInt(previousMetrics[1]?.value || "0"),
      change: calculateChange(
        currentMetrics[1]?.value || "0",
        previousMetrics[1]?.value || "0"
      ),
    },
    newUsers: {
      name: "New Users",
      value: parseInt(currentMetrics[2]?.value || "0"),
      previousValue: parseInt(previousMetrics[2]?.value || "0"),
      change: calculateChange(
        currentMetrics[2]?.value || "0",
        previousMetrics[2]?.value || "0"
      ),
    },
    sessions: {
      name: "Sessions",
      value: parseInt(currentMetrics[3]?.value || "0"),
      previousValue: parseInt(previousMetrics[3]?.value || "0"),
      change: calculateChange(
        currentMetrics[3]?.value || "0",
        previousMetrics[3]?.value || "0"
      ),
    },
    bounceRate: {
      name: "Bounce Rate",
      value: parseFloat(currentMetrics[4]?.value || "0").toFixed(2) + "%",
      previousValue:
        parseFloat(previousMetrics[4]?.value || "0").toFixed(2) + "%",
      change: calculateChange(
        currentMetrics[4]?.value || "0",
        previousMetrics[4]?.value || "0"
      ),
    },
    avgSessionDuration: {
      name: "Avg. Session Duration",
      value: formatDuration(parseFloat(currentMetrics[5]?.value || "0")),
      previousValue: formatDuration(
        parseFloat(previousMetrics[5]?.value || "0")
      ),
      change: calculateChange(
        currentMetrics[5]?.value || "0",
        previousMetrics[5]?.value || "0"
      ),
    },
    topPages,
    usersByCountry,
    usersByDevice,
    dailyData,
  };
}
