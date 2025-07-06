import { create } from "zustand";

const dbId = "6863fdf40030a0e586bc";
const colId = "6863fe1d002023a8e395";

const planColId = "plans"; // Assuming the collection ID for plans is the same as tasks

import { database } from "../../services/appwrite";

const usePlanStore = create((set) => ({
  visibleAddModal: false,
  setVisibleAddModal: (visible) => set({ visibleAddModal: visible }),
  plans: [],
  getPlans: async (database) => {
    try {
      const response = await database.listDocuments(dbId, planColId);
      set({ plans: response.documents || [] });
    } catch (error) {
      console.error("❌ Failed to list documents:", error);
    }
  },
  addPlan: async (plan) => {
    try {
      const response = await database.createDocument(
        dbId,
        planColId,
        "unique()",
        plan
      );
      set((state) => ({ plans: [...state.plans, response] }));
    } catch (error) {
      console.error("❌ Failed to create document:", error);
    }
  },
  deletePlan: async (planId) => {
    try {
      await database.deleteDocument(dbId, planColId, planId);
      set((state) => ({
        plans: state.plans.filter((plan) => plan.$id !== planId),
      }));
    } catch (error) {
      console.error("❌ Failed to delete document:", error);
    }
  },
}));

export default usePlanStore;
