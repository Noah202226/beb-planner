import { create } from "zustand";

const dbId = "6863fdf40030a0e586bc";
const planColId = "finances"; // Assuming the collection ID for plans is the same as tasks

import { database } from "../../services/appwrite";

const useFinanceStore = create((set) => ({
  transactions: [],
  getFinanceTransactions: async () => {
    try {
      const response = await database.listDocuments(dbId, planColId);
      set({ transactions: response.documents || [] });
    } catch (error) {
      console.error("❌ Failed to list documents:", error);
    }
  },
  addPlan: async (tx) => {
    try {
      const response = await database.createDocument(
        dbId,
        planColId,
        "unique()",
        tx
      );
      set((state) => ({ plans: [...state.plans, response] }));
    } catch (error) {
      console.error("❌ Failed to create document:", error);
    }
  },
  deleteTx: async (txId) => {
    try {
      await database.deleteDocument(dbId, planColId, txId);
      set((state) => ({
        plans: state.plans.filter((plan) => plan.$id !== txId),
      }));
    } catch (error) {
      console.error("❌ Failed to delete document:", error);
    }
  },

  visibleAddModal: false,
  setVisibleAddModal: (visible) => set({ visibleAddModal: visible }),
}));

export default useFinanceStore;
