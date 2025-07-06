import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Avatar,
  Button,
  Card,
  SegmentedButtons,
  Snackbar,
  TextInput,
} from "react-native-paper";

// utilities
import formatDate from "../utils/formatDate";

import { useState } from "react";
import { ID } from "react-native-appwrite";
import { database } from "../../services/appwrite";

// Components
import ModifyTask from "./ModifyTask";
import Picker from "./Picker";
import PriorityPicker from "./PriorityPicker";

// Icons
import Ionicons from "@expo/vector-icons/Ionicons";

import { FlashList } from "@shopify/flash-list";

// Store
import useTaskStore from "../store/useTaskStore";

// Utils
import formatDateAndTime from "../utils/formatDateAndTime";
import TaskToSelect from "./TaskToSelect";

const TaskList = ({
  dbId,
  colId,
  getDocuments,
  isLoading,
  modalVisible,
  setModalVisible,
}) => {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  const [visible, setVisible] = useState(false);
  const onDismissSnackBar = () => setVisible(false);

  const [filterValue, setFilterValue] = useState("today");
  const [taskList, setTaskList] = useState([]);

  const [taskTo, setTaskTo] = useState("Noa");

  // Zustand store for tasks
  const taskStore = useTaskStore((state) => state.tasks);
  const authUser = useTaskStore((state) => state.authUser);
  const getTasks = useTaskStore((state) => state.getTasks);

  const filteredTasks = taskStore.filter((task) => {
    if (filterValue === "today") {
      return formatDate(task.taskDeadline) === new Date().toDateString();
    } else if (filterValue === "tommorrow") {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return (
        new Date(task.taskDeadline).toDateString() === tomorrow.toDateString()
      );
    } else {
      return true; // For "all", show all tasks
    }
  });

  const [showModifyTaskVisible, setModifyTaskVisible] = useState(false);
  const [selecteTaskToModify, setSelectedTaskToModify] = useState(undefined);

  const [newTask, setNewTask] = useState("");
  const [taskPurpose, setTaskPurpose] = useState("");

  const [selectedDateOnPicker, setSelectedDateOnPicker] = useState(new Date());
  const [taskPriority, setTaskPriority] = useState("LOW");

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "#D84040"; // light red
      case "medium":
        return "#FFF085"; // light yellow
      case "low":
        return "#57B4BA"; // light green
      default:
        return "#e0e0e0"; // default gray
    }
  };

  const saveNote = () => {
    if (newTask.trim() == "") return;

    console.log("AuthState ", authUser.name);

    const data = {
      taskName: newTask,
      taskPurpose: taskPurpose,
      taskDeadline: selectedDateOnPicker,
      priority: taskPriority,
      createdAt: new Date(),
      createdBy: authUser.name, // Get the current user's ID
      taskTo: taskTo,
    };

    database
      .createDocument(dbId, colId, ID.unique(), data)
      .then(() => {
        // getDocuments();
        getTasks(database);

        setModalVisible(false);
        console.log("task added");
        setNewTask("");
      })
      .catch((e) => {
        console.log(e);
        setModalVisible(false);
      });
  };
  return (
    <>
      {isLoading == true ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Fetching Task...</Text>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>TaskList</Text>
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              style={{
                backgroundColor: "coral",
                padding: 5,
                borderRadius: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="add-circle" size={24} color="black" />
                <Text
                  style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
                >
                  Add task
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <SegmentedButtons
            value={filterValue}
            onValueChange={(value) => {
              setFilterValue(value);
            }}
            style={{ marginBottom: 10 }}
            density="small"
            buttons={[
              {
                value: "today",
                label: `Today (${
                  taskStore.filter(
                    (task) =>
                      formatDate(task.taskDeadline) ===
                      new Date().toDateString()
                  ).length
                })`,
                onPress: () => console.log("Walking selected"),
              },
              {
                value: "tommorrow",
                label: `next (${
                  taskStore.filter((task) => {
                    const tomorrow = new Date();
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    return (
                      new Date(task.taskDeadline).toDateString() ===
                      tomorrow.toDateString()
                    );
                  }).length
                })`,
                onPress: () => console.log("Transit selected"),
              },
              {
                value: "all",
                label: `All (${taskStore?.length})`,
                onPress: () => console.log("Driving selected"),
              },
            ]}
          />

          <FlashList
            // style={{ paddingBottom: 20, marginBottom: 20 }}
            estimatedItemSize={100}
            data={filteredTasks}
            keyExtractor={(item) => item.$id || item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  console.log("Show ID: ", item.$id || item.id);
                  setModifyTaskVisible(true);
                  setSelectedTaskToModify(item.$id || item.id);
                }}
              >
                <Card
                  style={{
                    backgroundColor: getPriorityColor(item?.priority),

                    marginBottom: 10,
                  }}
                >
                  <Card.Title
                    titleStyle={{
                      fontSize: 18,
                      fontWeight: "bold",
                      color: item.priority == "high" ? "white" : "black",
                    }}
                    subtitleStyle={{
                      color: item.priority == "high" ? "white" : "black",
                    }}
                    title={item.taskName}
                    subtitle={formatDate(item.createdAt)}
                    left={LeftContent}
                  />
                  <Card.Content>
                    <Text
                      style={{
                        color: item.priority == "high" ? "white" : "black",
                      }}
                      variant="titleLarge"
                    >
                      {item.taskName}
                    </Text>
                    <Text
                      style={{
                        color: item.priority == "high" ? "white" : "black",
                      }}
                      variant="bodyMedium"
                    >
                      {item.taskPurpose}
                    </Text>
                    <Text
                      style={{
                        color: item.priority == "high" ? "white" : "black",
                      }}
                      variant="bodyMedium"
                    >
                      {formatDateAndTime(item.taskDeadline)}
                    </Text>
                  </Card.Content>
                  {/* <Card.Cover source={{ uri: "https://picsum.photos/700" }} /> */}
                  <Card.Actions>
                    <Button
                      mode="contained"
                      buttonColor={item.priority == "high" ? "green" : "red"}
                      textColor="white"
                      icon="check"
                      onPress={() => setVisible(true)}
                    >
                      Task done
                    </Button>
                  </Card.Actions>
                </Card>
              </TouchableOpacity>
            )}
          />

          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
              label: "Great!",
              onPress: () => {
                // Do something
              },
            }}
          >
            It's not yet working.
          </Snackbar>

          <ModifyTask
            showModifyTaskVisible={showModifyTaskVisible}
            setModifyTaskVisible={setModifyTaskVisible}
            selectedTaskToModify={selecteTaskToModify}
            dbId={dbId}
            colId={colId}
            getDocuments={getDocuments}
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
                  style={{ marginBottom: 10 }}
                  placeholder="Enter task..."
                  placeholderTextColor="#aaa"
                  value={newTask}
                  onChangeText={(e) => setNewTask(e)}
                  mode="outlined"
                />

                <TextInput
                  // style={styles.input}
                  placeholder="Enter task purpose..."
                  placeholderTextColor="#aaa"
                  value={taskPurpose}
                  onChangeText={(e) => setTaskPurpose(e)}
                  mode="outlined"
                  multiline
                  numberOfLines={3}
                  style={{ height: 100 }}
                />

                <Picker
                  selectedDateOnPicker={selectedDateOnPicker}
                  setSelectedDateOnPicker={setSelectedDateOnPicker}
                />

                <PriorityPicker
                  taskPriority={taskPriority}
                  setTaskPriority={setTaskPriority}
                />

                <TaskToSelect taskTo={taskTo} setTaskTo={setTaskTo} />

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={saveNote}
                  >
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  container: {
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
