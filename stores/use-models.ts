import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Model } from "@/lib/types";

type ModelStore = {
  models: Model[];
  setModels: (models: Model[]) => void;
  selectedModels: Model[];
  addSelectedModel: (model: Model) => void;
  removeSelectedModel: (model: Model) => void;
  reorderSelectedModels: (fromIndex: number, toIndex: number) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useModels = create<ModelStore>()(
  persist(
    (set) => ({
      models: [],
      setModels: (models: Model[]) => set({ models }),
      selectedModels: [],
      addSelectedModel: (model: Model) =>
        set((state) => ({ selectedModels: [...state.selectedModels, model] })),
      removeSelectedModel: (model: Model) =>
        set((state) => ({
          selectedModels: state.selectedModels.filter((m) => m.id !== model.id),
        })),
      reorderSelectedModels: (fromIndex: number, toIndex: number) =>
        set((state) => {
          const newSelectedModels = [...state.selectedModels];
          const [reorderedItem] = newSelectedModels.splice(fromIndex, 1);
          newSelectedModels.splice(toIndex, 0, reorderedItem);
          return { selectedModels: newSelectedModels };
        }),
      isLoading: true,
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: "models",
      partialize: (state) => ({
        selectedModels: state.selectedModels,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isLoading = true;
        }
      },
    },
  ),
);
