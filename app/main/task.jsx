import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import taskService from "../../services/taskService";

const task = () => {
  const [task, setTask] = useState([
    {
      id: 1,
      taskName: "Make this work",
      taskAdded: "07/01/2025",
    },
    {
      id: 2,
      taskName: "Set Goals and Plans",
      taskAdded: "07/01/2025",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    setIsLoading(true);
    const response = await taskService.getTasks();

    if (response.error) {
      setError(response.error);
      Alert.alert("Error", response.error);
    } else {
      setTask(response.data);
      setError(null);
    }

    setIsLoading(false);
  };

  const saveNote = () => {
    if (newTask.trim() == "") return;

    setTask((prevTasks) => [
      ...prevTasks,
      {
        id: Date.now.toString(),
        taskName: newTask,
        taskAdded: Date.now.toString(),
      },
    ]);

    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text>task</Text>

      <FlatList
        data={task}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text style={styles.noteText}>{item.taskName}</Text>
            <Text style={styles.noteText}>{item.taskAdded}</Text>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add a New Task</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter task..."
              placeholderTextColor="#aaa"
              value={newTask}
              onChangeText={(e) => setNewTask(e)}
            />

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

export default task;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  noteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "coral",
    padding: 15,
    borderRadius: 5,
    marginVertical: 5,
  },
  noteText: {
    fontSize: 16,
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    left: 20,
    backgroundColor: "coral",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
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
