import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Button, Platform, Text, View } from "react-native";

const Picker = ({ selectedDateOnPicker, setSelectedDateOnPicker }) => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [mode, setMode] = useState("date"); // 'date' or 'time'

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios"); // Keep picker open on iOS until confirmed
    setSelectedDateOnPicker(currentDate);
  };

  const showMode = (currentMode) => {
    setShowPicker(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "cyan",
        padding: 10,
        marginBottom: 5,
      }}
    >
      <Text style={{ fontSize: 14, padding: 10, fontWeight: "bold" }}>
        Set Deadline: {selectedDateOnPicker?.toLocaleString() || new Date()}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Button onPress={showDatepicker} title="Pick date" />
        <Button onPress={showTimepicker} title="Pick time" />
      </View>

      {showPicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={selectedDateOnPicker}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default Picker;
