import { Picker } from "@react-native-picker/picker";
import { StyleSheet, Text, View } from "react-native";

const TaskToSelect = ({ taskTo, setTaskTo }) => {
  return (
    <View style={{ backgroundColor: "cyan", padding: 10, marginBottom: 5 }}>
      <Text>Task To:</Text>

      <Picker
        style={{
          borderWidth: "4px",
          borderColor: "black",
        }}
        selectedValue={taskTo}
        onValueChange={(itemValue, itemIndex) => setTaskTo(itemValue)}
      >
        <Picker.Item label="Beb Noa" value="Noa" />
        <Picker.Item label="Beb Louriz" value="Louriz" />
      </Picker>
    </View>
  );
};

export default TaskToSelect;

const styles = StyleSheet.create({});
