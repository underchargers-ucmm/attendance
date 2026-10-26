import { useState } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import { getAvatarPublicUrl } from "@/lib/avatarUrl";
function initials(name?: string) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
export function AppAvatar({
  name,
  avatarPath,
  size = 40,
  style,
}: {
  name?: string;
  avatarPath?: string | null;
  size?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const theme = useTheme();
  const [failed, setFailed] = useState(false);
  if (avatarPath && !failed) {
    return (
      <Avatar.Image
        size={size}
        source={{ uri: getAvatarPublicUrl(avatarPath) }}
        onError={() => setFailed(true)}
        style={style}
      />
    );
  }
  return (
    <Avatar.Text
      size={size}
      label={initials(name)}
      style={[{ backgroundColor: theme.colors.secondaryContainer }, style]}
    />
  );
}
