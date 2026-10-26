import { Redirect, Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppHeader } from "@/components/AppHeader";
import { AppTabBarIcon } from "@/components/AppTabBarIcon";
import { LoadingState } from "@/components/ScreenState";
import { useAuth } from "@/features/auth/hooks/useAuth";
export default function AdminLayout() {
  const { session, profile, loading } = useAuth();
  const insets = useSafeAreaInsets();
  if (loading) return <LoadingState />;
  if (!session) return <Redirect href="/(auth)/login" />;
  if (profile && profile.role === "employee")
    return <Redirect href="/(employee)" />;
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
        name="staff"
        options={{
          title: "Staff",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <AppTabBarIcon
              name={focused ? "account-group" : "account-group-outline"}
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
              name={focused ? "calendar-check" : "calendar-check-outline"}
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
          title: "Tasks",
          tabBarIcon: ({ focused, color, size }) => (
            <AppTabBarIcon
              name={focused ? "clipboard-list" : "clipboard-list-outline"}
              focused={focused}
              color={color}
              size={size}
            />
          ),
          header: () => (
            <AppHeader title="Tasks" mode="medium" accountMenu notifications />
          ),
        }}
      />
      <Tabs.Screen
        name="leave"
        options={{
          title: "Leave",
          tabBarIcon: ({ focused, color, size }) => (
            <AppTabBarIcon
              name="airplane-takeoff"
              focused={focused}
              color={color}
              size={size}
            />
          ),
          header: () => (
            <AppHeader title="Leave" mode="medium" accountMenu notifications />
          ),
        }}
      />
      <Tabs.Screen
        name="kpi"
        options={{
          title: "KPI Overview",
          tabBarLabel: "KPI",
          tabBarIcon: ({ focused, color, size }) => (
            <AppTabBarIcon
              name="chart-line"
              focused={focused}
              color={color}
              size={size}
            />
          ),
          header: () => (
            <AppHeader
              title="KPI Overview"
              mode="medium"
              accountMenu
              notifications
            />
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
