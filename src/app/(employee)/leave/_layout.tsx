import { router, Stack } from "expo-router";
import { AppHeader } from "@/components/AppHeader";
export default function LeaveStackLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <AppHeader title="Leave" mode="medium" accountMenu />,
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          presentation: "modal",
          header: () => (
            <AppHeader title="Request Time Off" onClose={() => router.back()} />
          ),
        }}
      />
    </Stack>
  );
}
