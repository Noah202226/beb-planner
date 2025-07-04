import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { useState } from "react";
import { ID } from "react-native-appwrite";
import { database } from "../../services/appwrite";
import formatDate from "../utils/formatDate";
import ModifyTask from "./ModifyTask";
import Picker from "./Picker";
import PriorityPicker from "./PriorityPicker";

import Ionicons from "@expo/vector-icons/Ionicons";

const TaskList = ({
  dbId,
  colId,
  getDocuments,
  task,
  isLoading,
  modalVisible,
  setModalVisible,
}) => {
  const [showModifyTaskVisible, setModifyTaskVisible] = useState(false);
  const [selecteTaskToModify, setSelectedTaskToModify] = useState(undefined);

  const [newTask, setNewTask] = useState("");

  const [selectedDateOnPicker, setSelectedDateOnPicker] = useState(new Date());
  const [taskPriority, setTaskPriority] = useState("LOW");

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "#ff5733"; // light red
      case "medium":
        return "#44b3a4"; // light yellow
      case "low":
        return "#ccffcc"; // light green
      default:
        return "#e0e0e0"; // default gray
    }
  };

  const saveNote = () => {
    if (newTask.trim() == "") return;
    console.log(selectedDateOnPicker);
    const data = {
      taskName: newTask,
      taskDeadline: selectedDateOnPicker,
      priority: taskPriority,
      createdAt: new Date(),
    };

    database
      .createDocument(dbId, colId, ID.unique(), data)
      .then(() => {
        getDocuments();
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

          <FlatList
            style={{ paddingBottom: 20, marginBottom: 20 }}
            data={task}
            keyExtractor={(item) => item.$id || item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  backgroundColor: getPriorityColor(item?.priority),
                  padding: 15,
                  borderRadius: 5,
                  marginVertical: 5,
                }}
                onPress={() => {
                  console.log("Show ID: ", item.$id || item.id);
                  setModifyTaskVisible(true);
                  setSelectedTaskToModify(item.$id || item.id);
                }}
              >
                <View style={styles.taskContainer}>
                  <Text style={styles.noteText}>
                    {item.taskName} -- Priority Level:{" "}
                    {item?.priority?.toUpperCase()}
                  </Text>
                  <Text>Created: {formatDate(item.createdAt)}</Text>

                  <View>
                    <Text>Deadline: {formatDate(item?.taskDeadline)}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />

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
                  style={styles.input}
                  placeholder="Enter task..."
                  placeholderTextColor="#aaa"
                  value={newTask}
                  onChangeText={(e) => setNewTask(e)}
                />

                <Picker
                  selectedDateOnPicker={selectedDateOnPicker}
                  setSelectedDateOnPicker={setSelectedDateOnPicker}
                />

                <PriorityPicker
                  taskPriority={taskPriority}
                  setTaskPriority={setTaskPriority}
                />

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
