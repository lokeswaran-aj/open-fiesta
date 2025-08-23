import { create } from "zustand";
import { persist } from "zustand/middleware";

type InputStore = {
  input: string;
  setInput: (input: string) => void;
  clearInput: () => void;
  streamingModelIds: Set<string>;
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
      clearInput: () => set({ input: "" }),
      streamingModelIds: new Set(),
      setStreamingModelId: (modelId: string) =>
        set((state) => ({
          streamingModelIds: state.streamingModelIds.add(modelId),
        })),
      removeStreamedModelId: (modelId: string) =>
        set((state) => {
          const newStreamingModelIds = new Set(
            [...state.streamingModelIds].filter((m) => m !== modelId),
          );
          console.log(newStreamingModelIds.size !== 0);
          return {
            streamingModelIds: newStreamingModelIds,
            isLoading: newStreamingModelIds.size !== 0,
          };
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
