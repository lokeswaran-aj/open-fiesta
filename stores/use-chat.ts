import { create } from "zustand";
import type { ChatType } from "@/db/schema";

type ChatStore = {
  chatId: string;
  setChatId: (chatId: string) => void;
  title: string;
  setTitle: (title: string) => void;
  history: ChatType[];
  setHistory: (history: ChatType[]) => void;
  addToHistory: (chats: ChatType[]) => void;
  offset: number;
  setOffset: (offset: number) => void;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useChat = create<ChatStore>()((set) => ({
  chatId: "",
  setChatId: (chatId: string) => set({ chatId }),
  title: "New Chat",
  setTitle: (title: string) => set({ title }),
  history: [],
  setHistory: (history: ChatType[]) => set({ history }),
  addToHistory: (chats: ChatType[]) =>
    set((state) => ({
      history: [...state.history, ...chats],
    })),
  offset: 0,
  setOffset: (offset: number) => set({ offset }),
  hasMore: true,
  setHasMore: (hasMore: boolean) => set({ hasMore }),
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));
