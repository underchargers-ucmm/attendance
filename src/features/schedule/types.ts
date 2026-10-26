import type { WeeklyScheduleEntry } from "@/types/database";
export type { WeeklyScheduleEntry };
export type DaySchedule = {
  dayOfWeek: number;
  isDayOff: boolean;
  startTime: string | null;
  endTime: string | null;
};
