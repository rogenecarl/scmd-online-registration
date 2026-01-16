"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { PersonFormData } from "@/components/president/registration/person-dialog";

interface RegistrationFormData {
  delegates: PersonFormData[];
  siblings: PersonFormData[];
  cooks: PersonFormData[];
  receiptImage: string;
}

interface RegistrationFormStore extends RegistrationFormData {
  // Event ID to scope the data (prevents data leaking between events)
  eventId: string | null;

  // Actions
  setEventId: (eventId: string) => void;
  setDelegates: (delegates: PersonFormData[]) => void;
  setSiblings: (siblings: PersonFormData[]) => void;
  setCooks: (cooks: PersonFormData[]) => void;
  setReceiptImage: (receiptImage: string) => void;

  // Add person
  addDelegate: (delegate: PersonFormData) => void;
  addSibling: (sibling: PersonFormData) => void;
  addCook: (cook: PersonFormData) => void;

  // Update person
  updateDelegate: (index: number, delegate: PersonFormData) => void;
  updateSibling: (index: number, sibling: PersonFormData) => void;
  updateCook: (index: number, cook: PersonFormData) => void;

  // Remove person
  removeDelegate: (index: number) => void;
  removeSibling: (index: number) => void;
  removeCook: (index: number) => void;

  // Clear all data
  clearForm: () => void;

  // Initialize with batch data (for edit mode)
  initializeWithBatchData: (data: {
    delegates: PersonFormData[];
    siblings: PersonFormData[];
    cooks: PersonFormData[];
    receiptImage: string;
  }) => void;
}

const initialState: RegistrationFormData = {
  delegates: [],
  siblings: [],
  cooks: [],
  receiptImage: "",
};

export const useRegistrationFormStore = create<RegistrationFormStore>()(
  persist(
    (set) => ({
      ...initialState,
      eventId: null,

      setEventId: (eventId) => set({ eventId }),

      setDelegates: (delegates) => set({ delegates }),
      setSiblings: (siblings) => set({ siblings }),
      setCooks: (cooks) => set({ cooks }),
      setReceiptImage: (receiptImage) => set({ receiptImage }),

      addDelegate: (delegate) =>
        set((state) => ({ delegates: [...state.delegates, delegate] })),
      addSibling: (sibling) =>
        set((state) => ({ siblings: [...state.siblings, sibling] })),
      addCook: (cook) =>
        set((state) => ({ cooks: [...state.cooks, cook] })),

      updateDelegate: (index, delegate) =>
        set((state) => ({
          delegates: state.delegates.map((d, i) => (i === index ? delegate : d)),
        })),
      updateSibling: (index, sibling) =>
        set((state) => ({
          siblings: state.siblings.map((s, i) => (i === index ? sibling : s)),
        })),
      updateCook: (index, cook) =>
        set((state) => ({
          cooks: state.cooks.map((c, i) => (i === index ? cook : c)),
        })),

      removeDelegate: (index) =>
        set((state) => ({
          delegates: state.delegates.filter((_, i) => i !== index),
        })),
      removeSibling: (index) =>
        set((state) => ({
          siblings: state.siblings.filter((_, i) => i !== index),
        })),
      removeCook: (index) =>
        set((state) => ({
          cooks: state.cooks.filter((_, i) => i !== index),
        })),

      clearForm: () => set({ ...initialState, eventId: null }),

      initializeWithBatchData: (data) =>
        set({
          delegates: data.delegates,
          siblings: data.siblings,
          cooks: data.cooks,
          receiptImage: data.receiptImage,
        }),
    }),
    {
      name: "registration-form-storage",
      storage: createJSONStorage(() => localStorage),
      // Only persist these fields (not receiptImage since File objects can't be persisted)
      partialize: (state) => ({
        eventId: state.eventId,
        delegates: state.delegates,
        siblings: state.siblings,
        cooks: state.cooks,
        // Note: receiptImage is intentionally NOT persisted
        // File objects cannot be serialized to localStorage
        // Users will need to re-select their receipt after refresh
      }),
    }
  )
);
