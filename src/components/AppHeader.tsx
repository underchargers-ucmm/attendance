import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Appbar,
  Badge,
  IconButton,
  Menu,
  Text,
  useTheme,
} from "react-native-paper";
import { AppAvatar } from "./AppAvatar";
import { SignOutDialog } from "./SignOutDialog";
import { headerTint } from "@/constants/theme";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useUnreadNotificationCount } from "@/features/notifications/hooks/useUnreadNotificationCount";
export type AppHeaderAction = {
  icon: string;
  onPress: () => void;
  accessibilityLabel: string;
};
export function AppHeader({
  title,
  mode = "small",
  onBack,
  onClose,
  actions,
  accountMenu = false,
  notifications = false,
}: {
  title: string;
  mode?: "small" | "medium";
  onBack?: () => void;
  onClose?: () => void;
  actions?: AppHeaderAction[];
  accountMenu?: boolean;
  notifications?: boolean;
}) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const router = useRouter();
  const { profile, signOut } = useAuth();
  const [menuVisible, setMenuVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const isAdmin = profile?.role !== "employee";
  const unreadCount = useUnreadNotificationCount(
    notifications ? profile?.id : undefined,
  );
  async function handleSignOut() {
    setConfirmVisible(false);
    await signOut();
  }
  const notificationsNode = notifications && (
    <View style={styles.bellWrap}>
      <IconButton
        icon="bell-outline"
        size={22}
        onPress={() =>
          router.push(
            isAdmin ? "/(admin)/notifications" : "/(employee)/notifications",
          )
        }
        accessibilityLabel={
          unreadCount > 0
            ? `Notifications, ${unreadCount} unread`
            : "Notifications"
        }
      />
      {unreadCount > 0 && (
        <Badge size={16} style={styles.bellBadge}>
          {unreadCount > 9 ? "9+" : unreadCount}
        </Badge>
      )}
    </View>
  );
  const accountMenuNode = accountMenu && (
    <Menu
      visible={menuVisible}
      onDismiss={() => setMenuVisible(false)}
      anchor={
        <Pressable
          onPress={() => setMenuVisible(true)}
          accessibilityLabel="Account menu"
          hitSlop={8}
        >
          <AppAvatar
            name={profile?.name}
            avatarPath={profile?.avatar_path}
            size={32}
          />
        </Pressable>
      }
    >
      {profile && (
        <Menu.Item
          leadingIcon="account-outline"
          title="View profile"
          onPress={() => {
            setMenuVisible(false);
            router.push(
              isAdmin ? `/(admin)/staff/${profile.id}` : "/(employee)/profile",
            );
          }}
        />
      )}
      <Menu.Item
        leadingIcon="logout"
        title="Sign out"
        onPress={() => {
          setMenuVisible(false);
          setConfirmVisible(true);
        }}
      />
    </Menu>
  );
  if (mode !== "small") {
    const backgroundColor = theme.dark ? headerTint.dark : headerTint.light;
    return (
      <>
        <View
          style={[
            styles.compactHeader,
            { backgroundColor, paddingTop: insets.top },
          ]}
        >
          <View style={styles.iconRow}>
            <View style={styles.sideGroup} />
            <View style={styles.centerOverlay} pointerEvents="box-none">
              <Image
                source={require("@/assets/images/uc-logo-mark.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View style={[styles.sideGroup, styles.sideGroupRight]}>
              {actions?.map((action) => (
                <IconButton
                  key={action.icon}
                  icon={action.icon}
                  size={22}
                  onPress={action.onPress}
                  accessibilityLabel={action.accessibilityLabel}
                />
              ))}
              {notificationsNode}
              {accountMenuNode}
            </View>
          </View>
          <Text variant="titleMedium" style={styles.compactTitle}>
            {title}
          </Text>
        </View>

        <SignOutDialog
          visible={confirmVisible}
          onDismiss={() => setConfirmVisible(false)}
          onConfirm={handleSignOut}
        />
      </>
    );
  }
  return (
    <>
      <Appbar.Header
        mode="small"
        statusBarHeight={insets.top}
        style={[styles.header, { backgroundColor: theme.colors.background }]}
      >
        {onClose ? (
          <Appbar.Action
            icon="close"
            onPress={onClose}
            accessibilityLabel="Close"
          />
        ) : (
          onBack && <Appbar.BackAction onPress={onBack} />
        )}
        <Appbar.Content title={title} />
        {actions?.map((action) => (
          <Appbar.Action
            key={action.icon}
            icon={action.icon}
            onPress={action.onPress}
            accessibilityLabel={action.accessibilityLabel}
          />
        ))}
        {notificationsNode}
        {accountMenu && (
          <View style={styles.avatarWrap}>{accountMenuNode}</View>
        )}
      </Appbar.Header>

      <SignOutDialog
        visible={confirmVisible}
        onDismiss={() => setConfirmVisible(false)}
        onConfirm={handleSignOut}
      />
    </>
  );
}
const styles = StyleSheet.create({
  header: {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  avatarWrap: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  bellWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  bellBadge: {
    position: "absolute",
    top: 6,
    right: 6,
  },
  compactHeader: {
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    paddingBottom: 8,
  },
  iconRow: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  sideGroup: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 48,
  },
  sideGroupRight: {
    marginLeft: "auto",
    marginRight: 8,
  },
  centerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 30,
    height: 30,
  },
  compactTitle: {
    textAlign: "center",
    marginTop: 2,
  },
});
