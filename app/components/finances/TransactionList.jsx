import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { FlashList } from "@shopify/flash-list";
import { Avatar, Card } from "react-native-paper";
import useFinanceStore from "../../store/useFinanceStore";
import formatDateAndTime from "../../utils/formatDateAndTime";

const TransactionList = () => {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="file" />;

  const transactions = useFinanceStore((state) => state.transactions);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text>TransactionList</Text>

      <FlashList
        estimatedItemSize={100}
        data={transactions}
        keyExtractor={(item) => item.$id || item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              console.log("Show ID: ", item.$id || item.id);
            }}
          >
            <Card
              style={{
                backgroundColor:
                  item.transactionType == "expense" ? "#FFCCCB" : "90EE90",
                marginBottom: 10,
              }}
            >
              <Card.Title
                titleStyle={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color:
                    item.transactionType == "expense" ? "#FFCCCB" : "#90EE90",
                }}
                subtitleStyle={{
                  color: item.priority == "expense" ? "white" : "black",
                }}
                title={
                  <View>
                    <Text>{item.transactionName}</Text>
                    <Text>{item.amount}</Text>
                  </View>
                }
                subtitle={formatDateAndTime(item.transactionDate)}
                left={LeftContent}
              />
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  ontainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 26,
    padding: 10,
    textAlign: "center",
    fontWeight: "black",
  },
  taskContainer: {
    flex: 1,
  },

  noteText: {
    fontSize: 18,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center0",
  },
  saveButtonText: {
    fontSize: 16,
    color: "#fff",
  },
});
