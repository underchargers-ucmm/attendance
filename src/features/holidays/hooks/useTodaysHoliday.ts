import { useCallback, useState } from "react";
import { toDateOnly } from "@/lib/dateOnly";
import { useRefetchOnFocus } from "@/hooks/useRefetchOnFocus";
import * as holidaysService from "../services/holidaysService";
import type { Holiday } from "../types";
export function useTodaysHoliday(): Holiday | null {
  const [holiday, setHoliday] = useState<Holiday | null>(null);
  const load = useCallback(async () => {
    try {
      setHoliday(
        await holidaysService.getTodaysHoliday(toDateOnly(new Date())),
      );
    } catch {
      setHoliday(null);
    }
  }, []);
  useRefetchOnFocus(load);
  return holiday;
}
