import { TimeRange } from "@/types/analytics";

export function getStartDate(timeRange: TimeRange, offset: number = 0): string {
  const date = new Date();
  let days = 0;
  
  switch (timeRange) {
    case "7days":
      days = 7;
      break;
    case "30days":
      days = 30;
      break;
    case "90days":
      days = 90;
      break;
  }
  
  date.setDate(date.getDate() - days + offset);
  return date.toISOString().split("T")[0];
}

export function getPreviousStartDate(timeRange: TimeRange): string {
  const date = new Date();
  let days = 0;
  
  switch (timeRange) {
    case "7days":
      days = 14;
      break;
    case "30days":
      days = 60;
      break;
    case "90days":
      days = 180;
      break;
  }
  
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
}
