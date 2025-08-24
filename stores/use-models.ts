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
    }),
    {
      name: "models",
      partialize: (state) => ({
        selectedModels: state.selectedModels,
      }),
    },
  ),
);
