import { create } from "zustand";
import { persist } from "zustand/middleware";

type InputStore = {
  input: string;
  setInput: (input: string) => void;
  clearInput: () => void;
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
