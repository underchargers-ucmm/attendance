import { supabase } from "@/services/supabase";
import type { Holiday } from "@/types/database";
import type { HolidayInput } from "../types";
export async function getAllHolidays(): Promise<Holiday[]> {
  const { data, error } = await supabase
    .from("holidays")
    .select("*")
    .order("date", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Holiday[];
}
export async function createHoliday(input: HolidayInput): Promise<Holiday> {
  const { data, error } = await supabase
    .from("holidays")
    .insert({
      name: input.name,
      date: input.date,
      blocks_check_in: input.blocksCheckIn,
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as Holiday;
}
export async function updateHoliday(
  id: string,
  input: HolidayInput,
): Promise<Holiday> {
  const { data, error } = await supabase
    .from("holidays")
    .update({
      name: input.name,
      date: input.date,
      blocks_check_in: input.blocksCheckIn,
    })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as Holiday;
}
export async function deleteHoliday(id: string): Promise<void> {
  const { error } = await supabase.from("holidays").delete().eq("id", id);
  if (error) throw error;
}
export async function getTodaysHoliday(
  dateOnly: string,
): Promise<Holiday | null> {
  const { data, error } = await supabase
    .from("holidays")
    .select("*")
    .eq("date", dateOnly)
    .maybeSingle();
  if (error) throw error;
  return data as Holiday | null;
}
