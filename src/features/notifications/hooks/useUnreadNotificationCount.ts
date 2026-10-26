import { useCallback, useState } from "react";
import { useRefetchOnFocus } from "@/hooks/useRefetchOnFocus";
import * as notificationsService from "../services/notificationsService";
export function useUnreadNotificationCount(employeeId: string | undefined) {
  const [count, setCount] = useState(0);
  const load = useCallback(async () => {
    if (!employeeId) return;
    try {
      setCount(await notificationsService.getUnreadCount(employeeId));
    } catch {}
  }, [employeeId]);
  useRefetchOnFocus(load);
  return count;
}
