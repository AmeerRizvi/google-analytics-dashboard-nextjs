import {NextResponse} from "next/server";
import {processAnalyticsData} from "@/utils/process-data";
import {TimeRange} from "@/types/analytics";
import {getPreviousStartDate, getStartDate} from "@/utils/dateHelpers";
import {analyticsDataClient, propertyId} from "@/lib/analytics";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const timeRange = (url.searchParams.get("timeRange") as TimeRange) || "7days";

  try {
    const startDate = getStartDate(timeRange);
    const previousStartDate = getPreviousStartDate(timeRange);
    const previousEndDate = getStartDate(timeRange, -1);

    const [
      metricsResult,
      previousMetricsResult,
      topPagesResult,
      usersByCountryResult,
      usersByDeviceResult,
      dailyDataResult,
    ] = await Promise.allSettled([
      analyticsDataClient.properties.runReport({
        property: `properties/${propertyId}`,
        requestBody: {
          dateRanges: [{startDate, endDate: "today"}],
          metrics: [
            {name: "screenPageViews"},
            {name: "activeUsers"},
            {name: "newUsers"},
            {name: "sessions"},
            {name: "bounceRate"},
            {name: "averageSessionDuration"},
          ],
        },
      }),

      analyticsDataClient.properties.runReport({
        property: `properties/${propertyId}`,
        requestBody: {
          dateRanges: [
            {startDate: previousStartDate, endDate: previousEndDate},
          ],
          metrics: [
            {name: "screenPageViews"},
            {name: "activeUsers"},
            {name: "newUsers"},
            {name: "sessions"},
            {name: "bounceRate"},
            {name: "averageSessionDuration"},
          ],
        },
      }),

      analyticsDataClient.properties.runReport({
        property: `properties/${propertyId}`,
        requestBody: {
          dateRanges: [{startDate, endDate: "today"}],
          dimensions: [{name: "pagePath"}],
          metrics: [{name: "screenPageViews"}],
          orderBys: [{metric: {metricName: "screenPageViews"}, desc: true}],
          limit: "10",
        },
      }),

      analyticsDataClient.properties.runReport({
        property: `properties/${propertyId}`,
        requestBody: {
          dateRanges: [{startDate, endDate: "today"}],
          dimensions: [{name: "country"}],
          metrics: [{name: "activeUsers"}],
          orderBys: [{metric: {metricName: "activeUsers"}, desc: true}],
          limit: "10",
        },
      }),

      analyticsDataClient.properties.runReport({
        property: `properties/${propertyId}`,
        requestBody: {
          dateRanges: [{startDate, endDate: "today"}],
          dimensions: [{name: "deviceCategory"}],
          metrics: [{name: "activeUsers"}],
          orderBys: [{metric: {metricName: "activeUsers"}, desc: true}],
        },
      }),

      analyticsDataClient.properties.runReport({
        property: `properties/${propertyId}`,
        requestBody: {
          dateRanges: [{startDate, endDate: "today"}],
          dimensions: [{name: "date"}],
          metrics: [{name: "screenPageViews"}, {name: "activeUsers"}],
          orderBys: [{dimension: {dimensionName: "date"}}],
        },
      }),
    ]);

    const getRows = (result: PromiseSettledResult<any>) =>
      result.status === "fulfilled" ? result.value.data.rows || [] : [];

    const getMetrics = (result: PromiseSettledResult<any>) =>
      result.status === "fulfilled"
        ? result.value.data.rows?.[0]?.metricValues || []
        : [];

    const data = processAnalyticsData(
      getMetrics(metricsResult),
      getMetrics(previousMetricsResult),
      getRows(topPagesResult),
      getRows(usersByCountryResult),
      getRows(usersByDeviceResult),
      getRows(dailyDataResult)
    );

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected analytics fetch error:", error);
    return NextResponse.json(
      {error: "Analytics failed unexpectedly"},
      {status: 500}
    );
  }
}
