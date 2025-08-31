import { create } from "zustand";
import { persist } from "zustand/middleware";

type InputStore = {
  input: string;
  setInput: (input: string) => void;
  inputId: string;
  setInputId: (inputId: string) => void;
  streamingModelIds: string[];
  setStreamingModelId: (modelId: string) => void;
  removeStreamedModelId: (modelId: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  shouldSubmit: boolean;
  setShouldSubmit: (shouldSubmit: boolean) => void;
  shouldStop: boolean;
  setShouldStop: (shouldStop: boolean) => void;
};

export const useInput = create<InputStore>()(
  persist(
    (set) => ({
      input: "",
      setInput: (input: string) => set({ input }),
      inputId: "",
      setInputId: (inputId: string) => set({ inputId }),
      streamingModelIds: [],
      setStreamingModelId: (modelId: string) =>
        set((state) => {
          const newState: Partial<InputStore> = {
            streamingModelIds: [...state.streamingModelIds, modelId],
          };
          if (!state.isLoading) newState.isLoading = true;
          if (state.input.length > 0) newState.input = "";

          return newState;
        }),
      removeStreamedModelId: (modelId: string) =>
        set((state) => {
          const index = state.streamingModelIds.indexOf(modelId);
          if (index === -1) return state;

          const updatedStreamingModelIds = [
            ...state.streamingModelIds.slice(0, index),
            ...state.streamingModelIds.slice(index + 1),
          ];
          const newState: Partial<InputStore> = {
            streamingModelIds: updatedStreamingModelIds,
          };
          if (updatedStreamingModelIds.length === 0) newState.isLoading = false;
          return newState;
        }),
      isLoading: false,
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      shouldSubmit: false,
      setShouldSubmit: (shouldSubmit: boolean) => set({ shouldSubmit }),
      shouldStop: false,
      setShouldStop: (shouldStop: boolean) => set({ shouldStop }),
    }),
    {
      name: "input",
      partialize: (state) => ({ input: state.input }),
    },
  ),
);
