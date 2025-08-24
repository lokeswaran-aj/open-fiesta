import type { GatewayLanguageModelEntry } from "@ai-sdk/gateway";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AI_MODELS } from "@/lib/models";

type ModelStore = {
  models: GatewayLanguageModelEntry[];
  setModels: (models: GatewayLanguageModelEntry[]) => void;
  selectedModels: GatewayLanguageModelEntry[];
  addSelectedModel: (model: GatewayLanguageModelEntry) => void;
  removeSelectedModel: (model: GatewayLanguageModelEntry) => void;
  reorderSelectedModels: (fromIndex: number, toIndex: number) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useModels = create<ModelStore>()(
  persist(
    (set) => ({
      models: [],
      setModels: (models: GatewayLanguageModelEntry[]) => set({ models }),
      selectedModels: [],
      addSelectedModel: (model: GatewayLanguageModelEntry) =>
        set((state) => ({ selectedModels: [...state.selectedModels, model] })),
      removeSelectedModel: (model: GatewayLanguageModelEntry) =>
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
        // Note: isLoading is intentionally excluded from persistence
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // Reset loading state on rehydration
          state.isLoading = true;
          // If no models are selected from storage, use the default models
          if (!state.selectedModels || state.selectedModels.length === 0) {
            state.selectedModels = AI_MODELS;
          }
        }
      },
    },
  ),
);
