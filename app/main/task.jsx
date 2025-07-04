import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { database } from "../../services/appwrite";
import TaskList from "../components/TaskList";

const task = () => {
  const dbId = "6863fdf40030a0e586bc";
  const colId = "6863fe1d002023a8e395";

  const [modalVisible, setModalVisible] = useState(false);

  const [task, setTask] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const getDocuments = async () => {
    try {
      const response = await database.listDocuments(dbId, colId);
      console.log("📄 Documents:", response.documents);
      setTask(response.documents || []);
      setIsLoading(false);
    } catch (error) {
      console.error("❌ Failed to list documents:", error);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <View style={styles.container}>
      <TaskList
        dbId={dbId}
        colId={colId}
        getDocuments={getDocuments}
        task={task}
        isLoading={isLoading}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

export default task;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
