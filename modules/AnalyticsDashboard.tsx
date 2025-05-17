import {RealtimeModule} from "./RealtimeModule";
import {AnalyticsModule} from "./AnalyticsModule";

export async function AnalyticsDashboard() {
  return (
    <div>
      <RealtimeModule />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
        <AnalyticsModule />
      </div>
    </div>
  );
}
