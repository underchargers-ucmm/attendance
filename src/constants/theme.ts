import {
  configureFonts,
  MD3DarkTheme,
  MD3LightTheme,
} from "react-native-paper";
import type { MD3Type } from "react-native-paper/lib/typescript/types";
const brand = {
  coral: "#FF385C",
  coralDark: "#D91E43",
  teal: "#00A699",
};
function variant(
  fontFamily: string,
  fontWeight: MD3Type["fontWeight"],
  fontSize: number,
  lineHeight: number,
  letterSpacing: number,
): MD3Type {
  return { fontFamily, fontWeight, fontSize, lineHeight, letterSpacing };
}
function buildFonts() {
  const bold = (size: number, lineHeight: number, spacing = 0) =>
    variant("Inter_700Bold", "700", size, lineHeight, spacing);
  const medium = (size: number, lineHeight: number, spacing = 0) =>
    variant("Inter_500Medium", "500", size, lineHeight, spacing);
  const regular = (size: number, lineHeight: number, spacing = 0) =>
    variant("Inter_400Regular", "400", size, lineHeight, spacing);
  return {
    displayLarge: bold(57, 64),
    displayMedium: bold(45, 52),
    displaySmall: bold(36, 44),
    headlineLarge: bold(32, 40),
    headlineMedium: bold(28, 36),
    headlineSmall: bold(24, 32),
    titleLarge: medium(22, 28),
    titleMedium: medium(16, 24, 0.15),
    titleSmall: medium(14, 20, 0.1),
    labelLarge: medium(14, 20, 0.1),
    labelMedium: medium(12, 16, 0.5),
    labelSmall: medium(11, 16, 0.5),
    bodyLarge: regular(16, 24, 0.15),
    bodyMedium: regular(14, 20, 0.25),
    bodySmall: regular(12, 16, 0.4),
  };
}
const fonts = configureFonts({ config: buildFonts() });
export const lightTheme = {
  ...MD3LightTheme,
  roundness: 4,
  fonts,
  colors: {
    ...MD3LightTheme.colors,
    primary: brand.coral,
    onPrimary: "#FFFFFF",
    primaryContainer: "#FFE1E6",
    onPrimaryContainer: "#5C0018",
    secondary: brand.teal,
    onSecondary: "#FFFFFF",
    secondaryContainer: "#CDF2EF",
    onSecondaryContainer: "#00332F",
    tertiary: "#946200",
    onTertiary: "#FFFFFF",
    tertiaryContainer: "#FFE3B8",
    onTertiaryContainer: "#2B1800",
    error: "#B3261E",
    onError: "#FFFFFF",
    errorContainer: "#FFDAD6",
    onErrorContainer: "#410002",
    background: "#FFFDF9",
    onBackground: "#222222",
    surface: "#FFFFFF",
    onSurface: "#222222",
    surfaceVariant: "#F7F7F7",
    onSurfaceVariant: "#717171",
    outline: "#DDDDDD",
    outlineVariant: "#EBEBEB",
    elevation: {
      ...MD3LightTheme.colors.elevation,
      level1: "#FAFAFA",
      level2: "#F5F5F5",
    },
  },
};
export const headerTint = {
  light: "#FFF1F3",
  dark: "#241417",
};
export const darkTheme = {
  ...MD3DarkTheme,
  roundness: 4,
  fonts,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#FF7C90",
    onPrimary: "#3D000B",
    primaryContainer: "#8E0025",
    onPrimaryContainer: "#FFE1E6",
    secondary: "#5FCFC5",
    onSecondary: "#00332F",
    secondaryContainer: "#00504A",
    onSecondaryContainer: "#CDF2EF",
    tertiary: "#FFB955",
    onTertiary: "#452B00",
    tertiaryContainer: "#633F00",
    onTertiaryContainer: "#FFE3B8",
    error: "#FFB4AB",
    onError: "#690005",
    errorContainer: "#93000A",
    onErrorContainer: "#FFDAD6",
    background: "#151515",
    onBackground: "#EDEDED",
    surface: "#1C1C1C",
    onSurface: "#EDEDED",
    surfaceVariant: "#3A3A3A",
    onSurfaceVariant: "#C2C2C2",
    outline: "#8F8F8F",
    outlineVariant: "#3A3A3A",
  },
};
export const statusColors = {
  success: "#2E7D32",
  warning: "#B26A00",
  danger: "#B3261E",
  neutral: "#717171",
};
