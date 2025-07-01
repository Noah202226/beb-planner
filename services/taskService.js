import databaseService from "./databaseService";

// Appwrite
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const coldId = process.env.EXPO_PUBLIC_APPWRITE_COL_TASKS_ID;

const taskService = {
  // get note
  async getTasks() {
    const response = await databaseService.listDocuments(dbId, coldId);
    if (response.error) {
      return { error: response.error };
    }

    return { data: response };
  },
};

export default taskService;
