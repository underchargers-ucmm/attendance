import { toDateOnly } from "./dateOnly";
export function dayLabel(iso: string): string {
  const date = new Date(iso);
  const opts: Intl.DateTimeFormatOptions = {
    weekday: "short",
    month: "short",
    day: "numeric",
  };
  if (date.getFullYear() !== new Date().getFullYear()) opts.year = "numeric";
  return date.toLocaleDateString(undefined, opts);
}
export type DaySection<T> = {
  key: string;
  title: string;
  data: T[];
};
export function groupByDay<
  T extends {
    check_in_at: string;
  },
>(records: T[]): DaySection<T>[] {
  const map = new Map<string, T[]>();
  for (const record of records) {
    const key = toDateOnly(new Date(record.check_in_at));
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(record);
  }
  return Array.from(map.entries()).map(([key, data]) => ({
    key,
    title: dayLabel(data[0].check_in_at),
    data,
  }));
}
