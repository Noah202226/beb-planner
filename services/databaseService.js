import { database } from "./appwrite";

const databaseService = {
  // List Documents
  async listDocuments(dbId, colId) {
    try {
      const response = await database.listDocuments(dbId, colId);
      return response.documents || [];
    } catch (error) {
      console.error("Error fetchings", error.message);
      return { error: error.message };
    }
  },
};

export default databaseService;
