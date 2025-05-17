export type TimeRange = "7days" | "30days" | "90days";

export type AnalyticsMetric = {
  name: string;
  value: string | number;
  previousValue?: string | number;
  change?: number;
};

export type AnalyticsData = {
  pageViews: AnalyticsMetric;
  users: AnalyticsMetric;
  newUsers: AnalyticsMetric;
  sessions: AnalyticsMetric;
  bounceRate: AnalyticsMetric;
  avgSessionDuration: AnalyticsMetric;
  topPages: {
    page: string;
    views: number;
  }[];
  usersByCountry: {
    country: string;
    users: number;
  }[];
  usersByDevice: {
    device: string;
    users: number;
  }[];
  dailyData: {
    date: string;
    pageViews: number;
    users: number;
  }[];
};

export type DimensionValue = {
  value: string;
};

export type MetricValue = {
  value: string;
};

export type Row = {
  dimensionValues?: DimensionValue[];
  metricValues?: MetricValue[];
};

export type RealtimeRow = {
  country: string;
  activeUsers: number;
};
