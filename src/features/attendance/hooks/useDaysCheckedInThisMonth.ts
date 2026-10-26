import { useCallback, useState } from "react";
import { useRefetchOnFocus } from "@/hooks/useRefetchOnFocus";
import * as attendanceService from "../services/attendanceService";
export function useDaysCheckedInThisMonth(employeeId: string | undefined) {
  const [days, setDays] = useState(0);
  const load = useCallback(async () => {
    if (!employeeId) return;
    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);
    try {
      const records = await attendanceService.getMyRecordsSince(
        employeeId,
        monthStart.toISOString(),
      );
      setDays(
        new Set(records.map((r) => new Date(r.check_in_at).toDateString()))
          .size,
      );
    } catch {}
  }, [employeeId]);
  useRefetchOnFocus(load);
  return days;
}
