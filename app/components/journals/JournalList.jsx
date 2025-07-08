import { StyleSheet, Text, View } from "react-native";

import { FlashList } from "@shopify/flash-list";
import { Modal } from "react-native-paper";

const JournalList = () => {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="file" />;
  const transactions = useFinanceStore((state) => state.transactions);
  const modalVisible = useFinanceStore((state) => state.modalVisible);
  const setModalVisible = useFinanceStore((state) => state.setModalVisible);

  const [newTask, setNewTask] = useState("");

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

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a New Task!</Text>

            <TextInput
              style={{ marginBottom: 10, backgroundColor: "#fff" }}
              placeholder="Journal name..."
              placeholderTextColor="#aaa"
              value={newTask}
              onChangeText={(e) => setNewTask(e)}
              mode="outlined"
              textColor="black"
            />

            <TextInput
              style={{
                marginBottom: 10,
                backgroundColor: "#fff",
                height: 80,
              }}
              textColor="black"
              placeholder="Enter task purpose..."
              placeholderTextColor="#aaa"
              value={taskPurpose}
              onChangeText={(e) => setTaskPurpose(e)}
              mode="outlined"
              multiline
              numberOfLines={3}
            />

            <Picker
              selectedDateOnPicker={selectedDateOnPicker}
              setSelectedDateOnPicker={setSelectedDateOnPicker}
            />

            <TaskToSelect taskTo={taskTo} setTaskTo={setTaskTo} />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={saveNote}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default JournalList;

const styles = StyleSheet.create({});
