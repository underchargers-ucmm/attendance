import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { ColorValue } from "react-native";
import { StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
export function AppTabBarIcon({
  name,
  focused,
  color,
  size,
}: {
  name: string;
  focused: boolean;
  color: ColorValue;
  size: number;
}) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.pill,
        focused && { backgroundColor: theme.colors.primaryContainer },
      ]}
    >
      <MaterialCommunityIcons name={name as never} color={color} size={size} />
    </View>
  );
}
const styles = StyleSheet.create({
  pill: {
    width: 56,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
