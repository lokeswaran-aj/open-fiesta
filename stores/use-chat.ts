import { create } from "zustand";

type ChatStore = {
  chatId: string;
  setChatId: (chatId: string) => void;
  title: string;
  setTitle: (title: string) => void;
};

export const useChat = create<ChatStore>()((set) => ({
  chatId: "",
  setChatId: (chatId: string) => set({ chatId }),
  title: "New Chat",
  setTitle: (title: string) => set({ title }),
}));
