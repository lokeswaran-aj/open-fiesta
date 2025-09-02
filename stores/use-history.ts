import { create } from "zustand";
import type { ChatType } from "@/db/schema";

type HistoryStore = {
  chatId: string;
  setChatId: (chatId: string) => void;
  title: string;
  setTitle: (title: string) => void;
  history: ChatType[];
  setHistory: (history: ChatType[]) => void;
  addToHistory: (chats: ChatType[]) => void;
  addLatestChatToHistory: (chat: ChatType) => void;
  updateLatestChatTitle: (title: string) => void;
  offset: number;
  setOffset: (offset: number) => void;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useHistory = create<HistoryStore>()((set) => ({
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
  addLatestChatToHistory: (chat: ChatType) =>
    set((state) => ({
      history: [chat, ...state.history],
    })),
  updateLatestChatTitle: (title: string) =>
    set((state) => ({
      history: state.history.map((chat) =>
        chat.id === state.history[0].id ? { ...chat, title } : chat,
      ),
    })),
  offset: 0,
  setOffset: (offset: number) => set({ offset }),
  hasMore: true,
  setHasMore: (hasMore: boolean) => set({ hasMore }),
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));
