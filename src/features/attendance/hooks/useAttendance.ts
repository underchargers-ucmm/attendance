import * as Haptics from "expo-haptics";
import { useCallback, useState } from "react";
import { Platform } from "react-native";
import { useRefetchOnFocus } from "@/hooks/useRefetchOnFocus";
import { getLocationById } from "@/features/locations/services/locationsService";
import type { Location } from "@/features/locations/types";
import type { DayType } from "@/types/database";
import * as attendanceService from "../services/attendanceService";
import * as geofenceTask from "../services/geofenceTask";
import * as locationService from "../services/locationService";
import type { AttendanceRecord } from "../types";
type PermissionState =
  "unknown" | "explaining" | "granted" | "denied" | "unavailable";
export function useAttendance(
  employeeId: string | undefined,
  locationId?: string | null,
  isRoaming?: boolean,
) {
  const [openRecord, setOpenRecord] = useState<AttendanceRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [permission, setPermission] = useState<PermissionState>("unknown");
  const [canAskAgain, setCanAskAgain] = useState(true);
  const [backgroundPermission, setBackgroundPermission] =
    useState<PermissionState>("unknown");
  const [busy, setBusy] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const load = useCallback(async () => {
    if (!employeeId) return;
    setLoading(true);
    setError(null);
    try {
      const record = await attendanceService.getOpenRecord(employeeId);
      setOpenRecord(record);
      const foreground = await locationService.getForegroundPermissionStatus();
      setPermission(foreground.status === "granted" ? "granted" : "explaining");
      setCanAskAgain(foreground.canAskAgain);
      let loadedLocation: Location | null = null;
      if (locationId) {
        loadedLocation = await getLocationById(locationId);
        setLocation(loadedLocation);
      } else {
        setLocation(null);
      }
      if (isRoaming) {
        setBackgroundPermission("unavailable");
      } else if (record && loadedLocation && Platform.OS !== "web") {
        const bgStatus = await locationService.getBackgroundPermissionStatus();
        setBackgroundPermission(
          bgStatus === "granted"
            ? "granted"
            : bgStatus === "unavailable"
              ? "unavailable"
              : "explaining",
        );
        if (bgStatus === "granted") {
          await geofenceTask.startGeofencing(loadedLocation).catch(() => {});
        }
      } else if (Platform.OS === "web") {
        setBackgroundPermission("unavailable");
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Could not load attendance status.",
      );
    } finally {
      setLoading(false);
    }
  }, [employeeId, locationId, isRoaming]);
  useRefetchOnFocus(load);
  async function grantPermission() {
    const result = await locationService.requestForegroundPermission();
    setPermission(result.status === "granted" ? "granted" : "denied");
    setCanAskAgain(result.canAskAgain);
  }
  async function grantBackgroundPermissionAndArm() {
    if (isRoaming) return;
    const status = await locationService.requestBackgroundPermission();
    setBackgroundPermission(status === "granted" ? "granted" : "denied");
    if (status === "granted" && location) {
      await geofenceTask.startGeofencing(location).catch(() => {});
    }
  }
  async function performCheckIn(dayType: DayType = "full") {
    if (!employeeId || permission !== "granted") return;
    setBusy(true);
    setError(null);
    try {
      const coords =
        permission === "granted"
          ? await locationService.getCurrentCoordinates()
          : null;
      const record = await attendanceService.checkIn(
        employeeId,
        coords,
        dayType,
        null,
        location?.expected_start,
      );
      setOpenRecord(record);
      if (Platform.OS !== "web")
        Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success,
        ).catch(() => {});
      if (coords) {
        locationService
          .reverseGeocode(coords)
          .then((address) =>
            address
              ? attendanceService.updateCheckInAddress(record.id, address)
              : null,
          )
          .then(
            (updated) =>
              updated &&
              setOpenRecord((current) =>
                current?.id === updated.id ? updated : current,
              ),
          )
          .catch(() => {});
      }
      if (location && Platform.OS !== "web" && !isRoaming) {
        const bgStatus = await locationService.getBackgroundPermissionStatus();
        if (bgStatus === "granted") {
          setBackgroundPermission("granted");
          await geofenceTask.startGeofencing(location).catch(() => {});
        } else {
          setBackgroundPermission("explaining");
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not check in.");
    } finally {
      setBusy(false);
    }
  }
  async function performCheckOut() {
    if (!openRecord) return;
    setBusy(true);
    setError(null);
    try {
      const coords =
        permission === "granted"
          ? await locationService.getCurrentCoordinates()
          : null;
      const recordId = openRecord.id;
      await attendanceService.checkOut(
        recordId,
        coords,
        "manual",
        null,
        location?.expected_end,
      );
      setOpenRecord(null);
      if (Platform.OS !== "web")
        Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success,
        ).catch(() => {});
      if (coords) {
        locationService
          .reverseGeocode(coords)
          .then((address) =>
            address
              ? attendanceService.updateCheckOutAddress(recordId, address)
              : null,
          )
          .catch(() => {});
      }
      if (Platform.OS !== "web")
        await geofenceTask.stopGeofencing().catch(() => {});
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not check out.");
    } finally {
      setBusy(false);
    }
  }
  return {
    openRecord,
    loading,
    error,
    busy,
    permission,
    canAskAgain,
    grantPermission,
    backgroundPermission,
    hasLocation: Boolean(location),
    grantBackgroundPermissionAndArm,
    checkIn: performCheckIn,
    checkOut: performCheckOut,
    reload: load,
  };
}
