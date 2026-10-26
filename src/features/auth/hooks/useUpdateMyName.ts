import { useState } from "react";
import * as staffService from "@/features/staff/services/staffService";
import { useAuth } from "./useAuth";
export function useUpdateMyName() {
  const { profile, refreshProfile } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  async function updateName(name: string) {
    if (!profile) return false;
    setSaving(true);
    setError(null);
    try {
      await staffService.updateEmployee(profile.id, {
        name,
        position: profile.position ?? "",
        department: profile.department ?? "",
        mobile_number: profile.mobile_number ?? "",
      });
      await refreshProfile();
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save your name.");
      return false;
    } finally {
      setSaving(false);
    }
  }
  return { saving, error, updateName };
}
