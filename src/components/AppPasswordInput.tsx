import { useState } from "react";
import {
  TextInput as PaperTextInput,
  type TextInputProps,
} from "react-native-paper";
import { AppTextInput } from "./AppTextInput";
export function AppPasswordInput(
  props: Omit<TextInputProps, "secureTextEntry" | "right">,
) {
  const [visible, setVisible] = useState(false);
  return (
    <AppTextInput
      {...props}
      secureTextEntry={!visible}
      right={
        <PaperTextInput.Icon
          icon={visible ? "eye-off" : "eye"}
          onPress={() => setVisible((v) => !v)}
          forceTextInputFocus={false}
        />
      }
    />
  );
}
