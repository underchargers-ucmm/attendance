import { Button, Dialog, Portal, Text } from "react-native-paper";
export function SignOutDialog({
  visible,
  onDismiss,
  onConfirm,
}: {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
}) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>Sign out?</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            You'll need to sign in again to continue.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button onPress={onConfirm}>Sign out</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
