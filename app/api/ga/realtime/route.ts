import {analyticsDataClient, propertyId} from "@/lib/analytics";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
  try {
    const {data} = await analyticsDataClient.properties.runRealtimeReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dimensions: [{name: "country"}],
        metrics: [{name: "activeUsers"}],
      },
    });

    const result = (data.rows || []).map((row) => ({
      country: row.dimensionValues?.[0]?.value || "Unknown",
      activeUsers: Number(row.metricValues?.[0]?.value || 0),
    }));

    return NextResponse.json(result);
  } catch {
    return NextResponse.json([], {status: 200});
  }
}
