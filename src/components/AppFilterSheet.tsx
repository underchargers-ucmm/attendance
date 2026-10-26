import { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Checkbox, Dialog, Portal } from "react-native-paper";
export type FilterOption = {
  value: string;
  label: string;
};
export function AppFilterSheet({
  visible,
  onDismiss,
  title,
  options,
  selected,
  onApply,
}: {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  options: FilterOption[];
  selected: string[];
  onApply: (next: string[]) => void;
}) {
  const [draft, setDraft] = useState<string[]>(selected);
  useEffect(() => {
    if (visible) setDraft(selected);
  }, [visible, selected]);
  function toggle(value: string) {
    setDraft((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }
  function apply() {
    onApply(draft);
    onDismiss();
  }
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.ScrollArea style={styles.scrollArea}>
          <ScrollView>
            {options.map((opt) => (
              <Checkbox.Item
                key={opt.value}
                label={opt.label}
                status={draft.includes(opt.value) ? "checked" : "unchecked"}
                onPress={() => toggle(opt.value)}
              />
            ))}
          </ScrollView>
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={() => setDraft([])}>Clear</Button>
          <Button mode="contained" onPress={apply}>
            Apply
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
const styles = StyleSheet.create({
  scrollArea: {
    paddingHorizontal: 0,
  },
});
