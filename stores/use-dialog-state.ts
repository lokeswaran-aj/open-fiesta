import { create } from "zustand";

interface DialogState {
  isModelSelectorOpen: boolean;
  isConfigDialogOpen: boolean;
  setModelSelectorOpen: (open: boolean) => void;
  setConfigDialogOpen: (open: boolean) => void;
  openConfigDialogFromModelSelector: () => void;
}

export const useDialogState = create<DialogState>((set) => ({
  isModelSelectorOpen: false,
  isConfigDialogOpen: false,
  setModelSelectorOpen: (open) => set({ isModelSelectorOpen: open }),
  setConfigDialogOpen: (open) => set({ isConfigDialogOpen: open }),
  openConfigDialogFromModelSelector: () =>
    set({ isModelSelectorOpen: false, isConfigDialogOpen: true }),
}));
