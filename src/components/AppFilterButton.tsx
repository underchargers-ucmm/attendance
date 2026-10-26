import { Button } from "react-native-paper";
export function AppFilterButton({
  activeCount,
  onPress,
  label = "Filters",
}: {
  activeCount: number;
  onPress: () => void;
  label?: string;
}) {
  return (
    <Button mode="outlined" icon="filter-variant" onPress={onPress} compact>
      {activeCount > 0 ? `${label} (${activeCount})` : label}
    </Button>
  );
}
