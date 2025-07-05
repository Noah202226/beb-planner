import { create } from "zustand";

const dbId = "6863fdf40030a0e586bc";
const colId = "6863fe1d002023a8e395";
const useTaskStore = create((set) => ({
  tasks: [],
  getTasks: async (database) => {
    try {
      const response = await database.listDocuments(dbId, colId);

      const priorityOrder = {
        high: 3,
        medium: 2,
        low: 1,
      };

      const sortedTasks = [...response.documents].sort((a, b) => {
        const priorityDiff =
          priorityOrder[b.priority] - priorityOrder[a.priority];
        if (priorityDiff !== 0) return priorityDiff;

        // Convert deadlines to timestamps for comparison
        return new Date(a.taskDeadline) - new Date(b.taskDeadline);
      });

      set({ tasks: sortedTasks || [] });
    } catch (error) {
      console.error("❌ Failed to list documents:", error);
    }
  },
  signUp: async (email, password, name) => {
    try {
      const response = await account.create("unique()", email, password, name);
      console.log("✅ User registered:", response);
    } catch (err) {
      console.error("❌ Registration failed:", err.message);
    }
  },
  getCurrentUser: async (account) => {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      console.error("❌ Failed to get current user:", error);
      return null;
    }
  },
  login: async (account, email, password) => {
    try {
      const session = await account.createEmailSession(email, password);
      return session;
    } catch (error) {
      console.error("❌ Failed to log in:", error);
      return null;
    }
  },
  logoutUser: async (account) => {
    try {
      await account.deleteSession("current");
      return true;
    } catch (error) {
      console.error("❌ Failed to log out user:", error);
      return false;
    }
  },
}));

export default useTaskStore;
