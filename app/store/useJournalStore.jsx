import { create } from "zustand";

const dbId = "6863fdf40030a0e586bc";
const planColId = "journals"; // Assuming the collection ID for plans is the same as tasks

const useJournalStore = create((set) => ({
  journals: [],

  getJournals: async () => {
    try {
      const response = await database.listDocuments(dbId, planColId);
      set({ journals: response.documents || [] });
    } catch (error) {
      console.error("❌ Failed to list documents:", error);
    }
  },
  addJournal: async (journal) => {
    try {
      const response = await database.createDocument(
        dbId,
        planColId,
        "unique()",
        journal
      );
      set((state) => ({ journals: [...state.journals, response] }));
    } catch (error) {
      console.error("❌ Failed to create document:", error);
    }
  },
  deleteJournal: async (journalId) => {
    try {
      await database.deleteDocument(dbId, planColId, journalId);
      set((state) => ({
        journals: state.journals.filter((journal) => journal.$id !== journalId),
      }));
    } catch (error) {
      console.error("❌ Failed to delete document:", error);
    }
  },

  visibleAddModal: false,
  setVisibleAddModal: (visible) => set({ visibleAddModal: visible }),
}));

export default useJournalStore;
// This store manages journal entries, allowing you to fetch, add, and delete journal entries from the Appwrite database.
// It uses Zustand for state management and Appwrite's database service for data operations.
