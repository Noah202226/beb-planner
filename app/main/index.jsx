import { Text, View } from "react-native";

const index = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 22, padding: 20 }}>DASHBOARD HERE</Text>
      <Text>-finance balances</Text>
      <Text>-task for today</Text>
      <Text>-schedules</Text>
      <Text>-Plans with details and target date</Text>
    </View>
  );
};

export default index;
