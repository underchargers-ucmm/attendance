import { router, Stack } from "expo-router";
import { AppHeader } from "@/components/AppHeader";
export default function AttendanceStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <AppHeader title="Attendance" mode="medium" accountMenu />
          ),
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          header: () => (
            <AppHeader
              title="Attendance details"
              onBack={() => router.back()}
            />
          ),
        }}
      />
    </Stack>
  );
}
