import { StyleSheet, View } from "react-native";
import TransactionList from "../components/finances/TransactionList";

const finance = () => {
  return (
    <View
      style={{
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
        height: 100,
      }}
    >
      {/* <FInanceDataTable /> */}

      <TransactionList />
    </View>
  );
};

export default finance;

const styles = StyleSheet.create({});
