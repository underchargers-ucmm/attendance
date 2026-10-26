import { Redirect, router, Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppHeader } from "@/components/AppHeader";
import { AppTabBarIcon } from "@/components/AppTabBarIcon";
import { LoadingState } from "@/components/ScreenState";
import { useAuth } from "@/features/auth/hooks/useAuth";
export default function EmployeeLayout() {
  const { session, profile, loading } = useAuth();
  const insets = useSafeAreaInsets();
  if (loading) return <LoadingState />;
  if (!session) return <Redirect href="/(auth)/login" />;
  if (profile && profile.role !== "employee")
    return <Redirect href="/(admin)/staff" />;
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          height: 64 + insets.bottom,
          paddingTop: 8,
          paddingBottom: 8 + insets.bottom,
        },
        tabBarLabelStyle: { fontFamily: "Inter_500Medium", fontSize: 11 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Check In",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <AppTabBarIcon
              name="map-marker-check"
              focused={focused}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="attendance"
        options={{
          title: "Attendance",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <AppTabBarIcon
              name={focused ? "calendar-clock" : "calendar-clock-outline"}
              focused={focused}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "My Tasks",
          tabBarIcon: ({ focused, color, size }) => (
            <AppTabBarIcon
              name={focused ? "clipboard-list" : "clipboard-list-outline"}
              focused={focused}
              color={color}
              size={size}
            />
          ),
          header: () => (
            <AppHeader
              title="My Tasks"
              mode="medium"
              accountMenu
              notifications
            />
          ),
        }}
      />
      <Tabs.Screen
        name="leave"
        options={{
          title: "Leave",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <AppTabBarIcon
              name="airplane-takeoff"
              focused={focused}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="kpi"
        options={{
          title: "My KPI",
          tabBarIcon: ({ focused, color, size }) => (
            <AppTabBarIcon
              name="chart-line"
              focused={focused}
              color={color}
              size={size}
            />
          ),
          header: () => (
            <AppHeader title="My KPI" mode="medium" accountMenu notifications />
          ),
        }}
      />

      <Tabs.Screen
        name="schedule"
        options={{
          href: null,
          title: "My Schedule",
          header: () => (
            <AppHeader title="My Schedule" onBack={() => router.back()} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          href: null,
          title: "My Profile",
          header: () => (
            <AppHeader title="My Profile" onBack={() => router.back()} />
          ),
        }}
      />

      <Tabs.Screen
        name="notifications"
        options={{
          href: null,
          title: "Notifications",
        }}
      />
    </Tabs>
  );
}
