import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
export function openAndroidDatePicker(
  value: Date,
  onChange: (date: Date) => void,
  minimumDate?: Date,
) {
  DateTimePickerAndroid.open({
    value,
    mode: "date",
    minimumDate,
    onChange: (event, selected) => {
      if (event.type === "set" && selected) onChange(selected);
    },
  });
}
export function openAndroidTimePicker(
  value: Date,
  onChange: (date: Date) => void,
) {
  DateTimePickerAndroid.open({
    value,
    mode: "time",
    onChange: (event, selected) => {
      if (event.type === "set" && selected) onChange(selected);
    },
  });
}
export function openAndroidDateTimePicker(
  value: Date,
  onChange: (date: Date) => void,
) {
  DateTimePickerAndroid.open({
    value,
    mode: "date",
    onChange: (dateEvent, selectedDate) => {
      if (dateEvent.type !== "set" || !selectedDate) return;
      DateTimePickerAndroid.open({
        value: selectedDate,
        mode: "time",
        onChange: (timeEvent, selectedTime) => {
          if (timeEvent.type !== "set" || !selectedTime) return;
          const combined = new Date(selectedDate);
          combined.setHours(
            selectedTime.getHours(),
            selectedTime.getMinutes(),
            0,
            0,
          );
          onChange(combined);
        },
      });
    },
  });
}
