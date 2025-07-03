import { useEffect } from "react";
import { Text, View } from "react-native";
import { database } from "../../services/appwrite.js"; // Adjust the import path as necessary
import { checkAppwriteConnection } from "../../services/checkConnection";

const index = () => {
  useEffect(() => {
    // This is where you can initialize any data or services
    // For example, fetching user data or initializing services
    console.log("Dashboard component mounted");
    checkAppwriteConnection().then(() =>
      console.log("Appwrite connection checked successfully")
    );
    getDocuments();
  }, []);

  const getDocuments = async () => {
    try {
      const response = await database.listDocuments(
        "6863fdf40030a0e586bc",
        "6863fe1d002023a8e395"
      );
      console.log("📄 Documents:", response.documents);
    } catch (error) {
      console.error("❌ Failed to list documents:", error);
    }
  };

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
