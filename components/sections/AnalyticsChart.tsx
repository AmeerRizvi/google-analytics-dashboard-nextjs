"use client";

import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {formatNumber, formatDate} from "@/utils/formatters";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  Line,
  LineChart,
  BarChart,
  Bar,
  TooltipProps,
} from "recharts";
import {motion} from "framer-motion";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {BarChart3, LineChart as LineChartIcon, TrendingUp} from "lucide-react";

interface AnalyticsChartProps {
  title: string;
  data: Array<{
    date: string;
    pageViews: number;
    users: number;
  }>;
  className?: string;
}

type ChartType = "area" | "line" | "bar";

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover text-popover-foreground p-3 rounded-lg shadow-lg border border-border">
        <p className="font-medium text-sm mb-2">{`Date: ${formatDate(
          label
        )}`}</p>
        {payload.map((entry, index) => (
          <div
            key={`item-${index}`}
            className="flex items-center gap-2 text-sm"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{backgroundColor: entry.color}}
            />
            <span className="font-medium">{entry.name}:</span>
            <span>{formatNumber(entry.value as number)}</span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export function AnalyticsChart({title, data, className}: AnalyticsChartProps) {
  const [chartType, setChartType] = useState<ChartType>("area");

  // Theme colors from CSS variables
  const pageViewsColor = "var(--chart-1)";
  const usersColor = "var(--chart-2)";

  const renderChart = () => {
    const commonProps = {
      data,
      margin: {top: 10, right: 30, left: 10, bottom: 10},
    };

    const commonAxisProps = {
      stroke: "var(--border)",
      strokeWidth: 1,
    };

    // Enhanced label styles for better visibility
    const labelStyle = {
      fontSize: "12px",
      fontWeight: 500,
      fill: "var(--foreground)",
    };

    switch (chartType) {
      case "area":
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="pageViews" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={pageViewsColor}
                  stopOpacity={0.8}
                />
                <stop offset="95%" stopColor={pageViewsColor} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="users" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={usersColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={usersColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              {...commonAxisProps}
              tickFormatter={formatDate}
              axisLine={false}
              tickLine={false}
              dy={10}
              tick={{...labelStyle}}
              interval="preserveStartEnd"
              minTickGap={30}
              padding={{left: 10, right: 10}}
            />
            <YAxis
              tickFormatter={(value) => formatNumber(value)}
              {...commonAxisProps}
              axisLine={false}
              tickLine={false}
              dx={-10}
              tick={{...labelStyle}}
              width={60}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              opacity={0.4}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{paddingTop: 20}}
              iconType="circle"
              iconSize={10}
              formatter={(value) => (
                <span
                  style={{...labelStyle, fontSize: "14px", paddingLeft: "4px"}}
                >
                  {value}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="pageViews"
              stroke={pageViewsColor}
              strokeWidth={2}
              fillOpacity={0.6}
              fill="url(#pageViews)"
              name="Page Views"
              activeDot={{r: 6, strokeWidth: 0}}
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke={usersColor}
              strokeWidth={2}
              fillOpacity={0.6}
              fill="url(#users)"
              name="Users"
              activeDot={{r: 6, strokeWidth: 0}}
            />
          </AreaChart>
        );
      case "line":
        return (
          <LineChart {...commonProps}>
            <XAxis
              dataKey="date"
              {...commonAxisProps}
              tickFormatter={formatDate}
              axisLine={false}
              tickLine={false}
              dy={10}
              tick={{...labelStyle}}
              interval="preserveStartEnd"
              minTickGap={30}
              padding={{left: 10, right: 10}}
            />
            <YAxis
              tickFormatter={(value) => formatNumber(value)}
              {...commonAxisProps}
              axisLine={false}
              tickLine={false}
              dx={-10}
              tick={{...labelStyle}}
              width={60}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              opacity={0.4}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{paddingTop: 20}}
              iconType="circle"
              iconSize={10}
              formatter={(value) => (
                <span
                  style={{...labelStyle, fontSize: "14px", paddingLeft: "4px"}}
                >
                  {value}
                </span>
              )}
            />
            <Line
              type="monotone"
              dataKey="pageViews"
              stroke={pageViewsColor}
              strokeWidth={2}
              dot={{r: 3, strokeWidth: 0, fill: pageViewsColor}}
              activeDot={{r: 6, strokeWidth: 0}}
              name="Page Views"
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke={usersColor}
              strokeWidth={2}
              dot={{r: 3, strokeWidth: 0, fill: usersColor}}
              activeDot={{r: 6, strokeWidth: 0}}
              name="Users"
            />
          </LineChart>
        );
      case "bar":
        return (
          <BarChart {...commonProps}>
            <XAxis
              dataKey="date"
              {...commonAxisProps}
              tickFormatter={formatDate}
              axisLine={false}
              tickLine={false}
              dy={10}
              tick={{...labelStyle}}
              interval="preserveStartEnd"
              minTickGap={30}
              padding={{left: 10, right: 10}}
            />
            <YAxis
              tickFormatter={(value) => formatNumber(value)}
              {...commonAxisProps}
              axisLine={false}
              tickLine={false}
              dx={-10}
              tick={{...labelStyle}}
              width={60}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              opacity={0.4}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{paddingTop: 20}}
              iconType="circle"
              iconSize={10}
              formatter={(value) => (
                <span
                  style={{...labelStyle, fontSize: "14px", paddingLeft: "4px"}}
                >
                  {value}
                </span>
              )}
            />
            <Bar
              dataKey="pageViews"
              fill={pageViewsColor}
              name="Page Views"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="users"
              fill={usersColor}
              name="Users"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        );
      default:
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="pageViews" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={pageViewsColor}
                  stopOpacity={0.8}
                />
                <stop offset="95%" stopColor={pageViewsColor} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="users" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={usersColor} stopOpacity={0.8} />
                <stop offset="95%" stopColor={usersColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              {...commonAxisProps}
              tickFormatter={formatDate}
              axisLine={false}
              tickLine={false}
              dy={10}
              tick={{...labelStyle}}
              interval="preserveStartEnd"
              minTickGap={30}
              padding={{left: 10, right: 10}}
            />
            <YAxis
              tickFormatter={(value) => formatNumber(value)}
              {...commonAxisProps}
              axisLine={false}
              tickLine={false}
              dx={-10}
              tick={{...labelStyle}}
              width={60}
            />
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              opacity={0.4}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{paddingTop: 20}}
              iconType="circle"
              iconSize={10}
              formatter={(value) => (
                <span
                  style={{...labelStyle, fontSize: "14px", paddingLeft: "4px"}}
                >
                  {value}
                </span>
              )}
            />
            <Area
              type="monotone"
              dataKey="pageViews"
              stroke={pageViewsColor}
              strokeWidth={2}
              fillOpacity={0.6}
              fill="url(#pageViews)"
              name="Page Views"
              activeDot={{r: 6, strokeWidth: 0}}
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke={usersColor}
              strokeWidth={2}
              fillOpacity={0.6}
              fill="url(#users)"
              name="Users"
              activeDot={{r: 6, strokeWidth: 0}}
            />
          </AreaChart>
        );
    }
  };

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5}}
    >
      <Card
        className={cn(
          "overflow-hidden shadow-md hover:shadow-lg transition-shadow",
          className
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>{title}</CardTitle>
          <div className="flex gap-1">
            <Button
              variant={chartType === "area" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("area")}
              className="h-8 w-8 p-0"
              title="Area Chart"
            >
              <TrendingUp className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === "line" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("line")}
              className="h-8 w-8 p-0"
              title="Line Chart"
            >
              <LineChartIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === "bar" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("bar")}
              className="h-8 w-8 p-0"
              title="Bar Chart"
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="h-[350px] pt-4">
          <motion.div
            key={chartType}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.3}}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
