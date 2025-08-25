import { create } from "zustand";
import { persist } from "zustand/middleware";

type InitialPromptStore = {
  initialPrompt: string;
  setInitialPrompt: (initialPrompt: string) => void;
};

export const useInitialPrompt = create<InitialPromptStore>()(
  persist(
    (set) => ({
      initialPrompt: "",
      setInitialPrompt: (initialPrompt: string) => set({ initialPrompt }),
    }),
    {
      name: "initial-prompt",
      partialize: (state) => ({ initialPrompt: state.initialPrompt }),
    },
  ),
);
