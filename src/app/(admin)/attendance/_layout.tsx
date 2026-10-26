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
      <Stack.Screen name="[id]" />
      <Stack.Screen
        name="edit"
        options={{
          presentation: "modal",
          header: () => (
            <AppHeader title="Edit attendance" onClose={() => router.back()} />
          ),
        }}
      />
    </Stack>
  );
}
