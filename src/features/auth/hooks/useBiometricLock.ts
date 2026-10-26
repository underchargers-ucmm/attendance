import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, type AppStateStatus } from "react-native";
import * as biometricService from "../services/biometricService";
const BACKGROUND_GRACE_MS = 30000;
export function useBiometricLock() {
  const [supported, setSupported] = useState(false);
  const [enabled, setEnabledState] = useState(false);
  const [loadingPreference, setLoadingPreference] = useState(true);
  const [locked, setLocked] = useState(true);
  const [authenticating, setAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const [isSupported, isEnabled] = await Promise.all([
        biometricService.isBiometricSupported(),
        biometricService.getBiometricPreference(),
      ]);
      setSupported(isSupported);
      setEnabledState(isEnabled);
      setLocked(isEnabled && isSupported);
      setLoadingPreference(false);
    })();
  }, []);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  const backgroundedAtRef = useRef<number | null>(null);
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      const wasActive = appStateRef.current === "active";
      const isNowActive = nextState === "active";
      if (wasActive && !isNowActive) {
        backgroundedAtRef.current = Date.now();
      } else if (!wasActive && isNowActive) {
        const backgroundedAt = backgroundedAtRef.current;
        backgroundedAtRef.current = null;
        if (
          enabled &&
          backgroundedAt !== null &&
          Date.now() - backgroundedAt > BACKGROUND_GRACE_MS
        ) {
          setLocked(true);
        }
      }
      appStateRef.current = nextState;
    });
    return () => subscription.remove();
  }, [enabled]);
  async function setEnabled(next: boolean) {
    if (next) {
      const ok = await biometricService.authenticate();
      if (!ok) return false;
    }
    await biometricService.setBiometricPreference(next);
    setEnabledState(next);
    return true;
  }
  const unlock = useCallback(async () => {
    setAuthenticating(true);
    setError(null);
    try {
      const ok = await biometricService.authenticate();
      if (ok) setLocked(false);
      else setError("Could not verify — try again.");
    } finally {
      setAuthenticating(false);
    }
  }, []);
  return {
    supported,
    enabled,
    setEnabled,
    loadingPreference,
    locked,
    authenticating,
    error,
    unlock,
  };
}
