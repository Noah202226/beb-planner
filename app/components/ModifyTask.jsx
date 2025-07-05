import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { database } from "../../services/appwrite";

import useTaskStore from "../store/useTaskStore";

const ModifyTask = ({
  showModifyTaskVisible,
  setModifyTaskVisible,
  selectedTaskToModify,
  dbId,
  colId,
  getDocuments,
}) => {
  const getTasks = useTaskStore((state) => state.getTasks);
  const deleteTask = () => {
    database
      .deleteDocument(dbId, colId, selectedTaskToModify)
      .then((data) => {
        console.log("Task deleted", data);
        // getDocuments();

        getTasks(database);
        // Optionally, you can also update Zustand store here if needed
        // useTaskStore.getState().getTasks(database);

        // Close the modal after deletion
        setModifyTaskVisible(false);
      })
      .catch((e) => console.log(e));
  };
  return (
    <View>
      {/* Modal */}
      <Modal
        visible={showModifyTaskVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.modalTitle}>Add a New Task</Text>
              <TouchableOpacity onPress={() => setModifyTaskVisible(false)}>
                <Text style={styles.saveButtonText}>CANCEL</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.modalTitle}>ID: {selectedTaskToModify}</Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModifyTaskVisible(false)}
              >
                <Text style={styles.cancelButtonText}>update/cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={deleteTask}>
                <Text style={styles.saveButtonText}>DELETE</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModifyTask;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 16,
    color: "#000",
  },
});
