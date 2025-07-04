import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";

const PriorityPicker = ({ taskPriority, setTaskPriority }) => {
  return (
    <View style={{ backgroundColor: "cyan", padding: 10, marginBottom: 5 }}>
      <Text>PriorityPicker</Text>

      <Picker
        style={{
          borderWidth: "4px",
          borderColor: "black",
        }}
        selectedValue={taskPriority}
        onValueChange={(itemValue, itemIndex) => setTaskPriority(itemValue)}
      >
        <Picker.Item label="Low" value="low" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="High" value="high" />
      </Picker>
    </View>
  );
};

export default PriorityPicker;

const styles = StyleSheet.create({});
