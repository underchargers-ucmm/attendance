import { useCallback, useState } from "react";
import { useRefetchOnFocus } from "@/hooks/useRefetchOnFocus";
import * as attendanceService from "@/features/attendance/services/attendanceService";
import * as leaveService from "@/features/leave/services/leaveService";
import * as tasksService from "@/features/tasks/services/tasksService";
import { isOverdue } from "@/features/tasks/types";
import { toDateOnly } from "@/lib/dateOnly";
export type AdminDashboardStats = {
  checkedInNow: number;
  lateToday: number;
  onLeaveToday: number;
  pendingLeaveRequests: number;
  overdueTasks: number;
};
export function useAdminDashboard() {
  const [stats, setStats] = useState<AdminDashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayDateOnly = toDateOnly(todayStart);
      const [checkedIn, todayAttendance, leaveRequests, tasks] =
        await Promise.all([
          attendanceService.getCurrentlyCheckedIn(),
          attendanceService.getTodayAttendance(todayStart.toISOString()),
          leaveService.getAllLeaveRequests(),
          tasksService.getAllTasks(),
        ]);
      setStats({
        checkedInNow: checkedIn.length,
        lateToday: todayAttendance.filter((r) => r.is_late).length,
        onLeaveToday: leaveRequests.filter(
          (r) =>
            r.status === "approved" &&
            r.start_date <= todayDateOnly &&
            r.end_date >= todayDateOnly,
        ).length,
        pendingLeaveRequests: leaveRequests.filter(
          (r) => r.status === "pending",
        ).length,
        overdueTasks: tasks.filter(isOverdue).length,
      });
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Could not load dashboard stats.",
      );
    } finally {
      setLoading(false);
    }
  }, []);
  useRefetchOnFocus(load);
  return { stats, loading, error, reload: load };
}
