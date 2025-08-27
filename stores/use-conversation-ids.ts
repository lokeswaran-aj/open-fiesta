import { v7 as uuidv7 } from "uuid";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ConversationIdsStore = {
  conversationIds: Record<string, string>;
  setConversationIds: (modelId: string, conversationId: string) => void;
  getConversationId: (modelId: string) => string | undefined;
  createConversationId: (modelId: string) => string;
  removeConversationId: (modelId: string) => void;
  clearConversationIds: () => void;
};

export const useConversationIds = create<ConversationIdsStore>()(
  persist(
    (set, get) => ({
      conversationIds: {},
      setConversationIds: (modelId: string, conversationId: string) =>
        set((state) => ({
          conversationIds: {
            ...state.conversationIds,
            [modelId]: conversationId,
          },
        })),
      getConversationId: (modelId: string) => get().conversationIds[modelId],
      createConversationId: (modelId: string) => {
        const conversationId = uuidv7();
        get().setConversationIds(modelId, conversationId);
        return conversationId;
      },
      removeConversationId: (modelId: string) =>
        set((state) => {
          const { [modelId]: _, ...rest } = state.conversationIds;
          return { conversationIds: rest };
        }),
      clearConversationIds: () => set({ conversationIds: {} }),
    }),
    {
      name: "conversation-ids",
      partialize: (state) => ({ conversationIds: state.conversationIds }),
    },
  ),
);
