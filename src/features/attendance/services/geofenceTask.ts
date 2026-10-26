import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { supabase } from "@/services/supabase";
import * as attendanceService from "./attendanceService";
import { getCurrentCoordinates } from "./locationService";
export const GEOFENCE_TASK_NAME = "attendance-geofence-task";
TaskManager.defineTask(GEOFENCE_TASK_NAME, async ({ data, error }) => {
  if (error) return;
  const { eventType } = (data ?? {}) as {
    eventType?: Location.GeofencingEventType;
  };
  if (eventType !== Location.GeofencingEventType.Exit) return;
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const employeeId = session?.user.id;
    if (!employeeId) return;
    const openRecord = await attendanceService.getOpenRecord(employeeId);
    if (!openRecord) return;
    const coords = await getCurrentCoordinates();
    await attendanceService.checkOut(openRecord.id, coords, "auto_geofence");
    await stopGeofencing();
  } catch {}
});
export async function startGeofencing(location: {
  id: string;
  latitude: number;
  longitude: number;
  radius_meters: number;
}) {
  await Location.startGeofencingAsync(GEOFENCE_TASK_NAME, [
    {
      identifier: location.id,
      latitude: location.latitude,
      longitude: location.longitude,
      radius: location.radius_meters,
      notifyOnEnter: false,
      notifyOnExit: true,
    },
  ]);
}
export async function stopGeofencing() {
  const isRegistered =
    await TaskManager.isTaskRegisteredAsync(GEOFENCE_TASK_NAME);
  if (isRegistered) await Location.stopGeofencingAsync(GEOFENCE_TASK_NAME);
}
export async function isGeofencingActive(): Promise<boolean> {
  return TaskManager.isTaskRegisteredAsync(GEOFENCE_TASK_NAME);
}
