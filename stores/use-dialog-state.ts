import { create } from "zustand";

interface DialogState {
  isModelSelectorOpen: boolean;
  setModelSelectorOpen: (open: boolean) => void;
}

export const useDialogState = create<DialogState>((set) => ({
  isModelSelectorOpen: false,
  setModelSelectorOpen: (open) => set({ isModelSelectorOpen: open }),
}));
