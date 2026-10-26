import { StyleSheet, View } from "react-native";
import { Button, Icon, Text, useTheme } from "react-native-paper";
import { useBiometricLock } from "@/features/auth/hooks/useBiometricLock";
export function BiometricGate({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const { enabled, loadingPreference, locked, authenticating, error, unlock } =
    useBiometricLock();
  if (loadingPreference) return null;
  if (!enabled || !locked) return <>{children}</>;
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Icon source="fingerprint" size={64} color={theme.colors.primary} />
      <Text variant="titleMedium" style={styles.title}>
        Attendance is locked
      </Text>
      <Text variant="bodyMedium" style={styles.subtitle}>
        Unlock with your fingerprint or face to continue.
      </Text>
      {error && (
        <Text
          variant="bodySmall"
          style={[styles.error, { color: theme.colors.error }]}
        >
          {error}
        </Text>
      )}
      <Button
        mode="contained"
        onPress={unlock}
        loading={authenticating}
        disabled={authenticating}
      >
        Unlock
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
    gap: 4,
  },
  title: {
    marginTop: 16,
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.7,
    textAlign: "center",
    marginBottom: 20,
  },
  error: {
    marginBottom: 12,
  },
});
