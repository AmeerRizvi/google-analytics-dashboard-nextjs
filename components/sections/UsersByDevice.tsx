"use client";

import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {formatNumber, formatPercentage} from "@/utils/formatters";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  Sector,
  TooltipProps,
} from "recharts";
import {motion} from "framer-motion";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {PieChartIcon, BarChart3, Smartphone as DevicesIcon} from "lucide-react";

interface UsersByDeviceProps {
  devices: Array<{
    device: string;
    users: number;
  }>;
  className?: string;
}

type ChartType = "pie" | "donut";

// Calculate total users to get percentages
const calculateTotal = (
  devices: Array<{device: string; users: number; value?: number}>
) => {
  return devices.reduce((sum, entry) => sum + (entry.value || entry.users), 0);
};

// Custom tooltip component
const CustomTooltip = ({active, payload}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const total = calculateTotal(payload[0].payload.parent);
    const percentage = (data.users / total) * 100;

    return (
      <div className="bg-popover text-popover-foreground p-3 rounded-lg shadow-lg border border-border">
        <p className="font-medium text-sm mb-2">{data.device}</p>
        <div className="flex items-center gap-2 text-sm">
          <div
            className="w-3 h-3 rounded-full"
            style={{backgroundColor: payload[0].color}}
          />
          <span className="font-medium">Users:</span>
          <span>{formatNumber(data.users)}</span>
        </div>
        <div className="text-sm mt-1">
          <span className="font-medium">Share:</span>
          <span className="ml-2">{formatPercentage(percentage)}</span>
        </div>
      </div>
    );
  }
  return null;
};

// Active shape for interactive pie chart
const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  return (
    <g>
      <text
        x={cx}
        y={cy - 15}
        dy={8}
        textAnchor="middle"
        fill="var(--foreground)"
        className="text-sm font-bold"
        style={{fontSize: "16px", fontWeight: 600}}
      >
        {payload.device}
      </text>
      <text
        x={cx}
        y={cy + 15}
        dy={8}
        textAnchor="middle"
        fill="var(--foreground)"
        className="text-sm"
        style={{fontSize: "14px", fontWeight: 500}}
      >
        {formatNumber(value)} ({(percent * 100).toFixed(1)}%)
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 5}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        strokeWidth={1}
        stroke="var(--background)"
      />
    </g>
  );
};

export function UsersByDevice({devices, className}: UsersByDeviceProps) {
  const [chartType, setChartType] = useState<ChartType>("donut");
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

  // Use theme colors from CSS variables
  const themeColors = [
    "var(--chart-1)",
    "var(--chart-2)",
    "var(--chart-3)",
    "var(--chart-4)",
    "var(--chart-5)",
  ];

  // Add value property to each device for recharts
  const enhancedData = devices.map((item) => ({
    ...item,
    value: item.users,
    parent: devices,
  }));

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(undefined);
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Users by Device</CardTitle>
          <div className="flex gap-1">
            <Button
              variant={chartType === "pie" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("pie")}
              className="h-8 w-8 p-0"
              title="Pie Chart"
            >
              <PieChartIcon className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === "donut" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("donut")}
              className="h-8 w-8 p-0"
              title="Donut Chart"
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="h-[350px]">
          <motion.div
            key={chartType}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 0.3}}
            className="h-full"
          >
            <div className="flex flex-row h-full">
              {/* Left side - Pie Chart */}
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={enhancedData}
                      cx="50%"
                      cy="45%"
                      labelLine={false}
                      innerRadius={chartType === "donut" ? 60 : 0}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="device"
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                      onMouseEnter={onPieEnter}
                      onMouseLeave={onPieLeave}
                      paddingAngle={chartType === "donut" ? 2 : 0}
                      animationDuration={750}
                      animationBegin={0}
                      animationEasing="ease-out"
                    >
                      {enhancedData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={themeColors[index % themeColors.length]}
                          stroke="var(--background)"
                          strokeWidth={1}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      wrapperStyle={{paddingTop: 20}}
                      iconSize={10}
                      formatter={(value) => (
                        <span
                          className="text-sm font-medium"
                          style={{
                            fontSize: "14px",
                            fontWeight: 500,
                            paddingLeft: "4px",
                          }}
                        >
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Right side - Static Data */}
              <div className="w-1/2 h-full flex flex-col justify-center px-6">
                <div className="bg-card/50 rounded-lg p-4 border border-border/50 shadow-sm">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <DevicesIcon className="h-5 w-5 mr-2 text-primary" />
                    Device Breakdown
                  </h3>

                  <div className="space-y-5">
                    {enhancedData.map((device, index) => {
                      const total = calculateTotal(devices);
                      const percentage = (device.users / total) * 100;

                      return (
                        <motion.div
                          key={device.device}
                          className="flex flex-col"
                          initial={{opacity: 0, y: 10}}
                          animate={{opacity: 1, y: 0}}
                          transition={{duration: 0.5, delay: index * 0.1}}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <div
                                className="w-4 h-4 rounded-full mr-2 shadow-sm"
                                style={{
                                  backgroundColor:
                                    themeColors[index % themeColors.length],
                                }}
                              />
                              <span className="font-medium text-sm">
                                {device.device}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="font-semibold">
                                {formatNumber(device.users)}
                              </span>
                              <span className="text-xs text-muted-foreground ml-2">
                                ({formatPercentage(percentage)})
                              </span>
                            </div>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{
                                backgroundColor:
                                  themeColors[index % themeColors.length],
                                width: `${percentage}%`,
                              }}
                              initial={{width: 0}}
                              animate={{width: `${percentage}%`}}
                              transition={{duration: 1, delay: index * 0.1}}
                            />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <div className="mt-6 pt-4 border-t border-border/50">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Total Users</span>
                      <span className="text-lg font-bold">
                        {formatNumber(calculateTotal(devices))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
