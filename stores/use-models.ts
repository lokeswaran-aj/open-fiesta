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
};

export const useModels = create<ModelStore>()(
  persist(
    (set) => ({
      models: AI_MODELS,
      setModels: (models: GatewayLanguageModelEntry[]) => set({ models }),
      selectedModels: AI_MODELS,
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
    }),
    {
      name: "models",
      partialize: (state) => ({
        selectedModels: state.selectedModels,
      }),
    },
  ),
);
