import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
export function useRefetchOnFocus(load: () => void) {
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load]),
  );
}
