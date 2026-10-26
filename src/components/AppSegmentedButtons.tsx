import type { ComponentProps } from "react";
import { SegmentedButtons, useTheme } from "react-native-paper";
export function AppSegmentedButtons(
  props: ComponentProps<typeof SegmentedButtons>,
) {
  const theme = useTheme();
  return (
    <SegmentedButtons
      {...props}
      theme={{
        colors: {
          secondaryContainer: theme.colors.primaryContainer,
          onSecondaryContainer: theme.colors.onPrimaryContainer,
        },
      }}
    />
  );
}
