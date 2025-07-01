import { StyleSheet, Text, View } from "react-native";

const finance = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 22, padding: 20 }}>Finance recordings here</Text>
      <Text>-income</Text>
      <Text>-expenses today</Text>
      <Text>-total expenses</Text>
    </View>
  );
};

export default finance;

const styles = StyleSheet.create({});
