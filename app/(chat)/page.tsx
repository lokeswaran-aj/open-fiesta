"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { v7 as uuidv7 } from "uuid";
import { createChat } from "@/actions/chat";
import { createConversation } from "@/actions/conversation";
import { ChatInput } from "@/components/chat-input";
import { MultiConversation } from "@/components/multi-conversation";
import { useTitle } from "@/hooks/use-title";
import { authClient } from "@/lib/auth-client";
import { useConversationIds } from "@/stores/use-conversation-ids";
import { useHistory } from "@/stores/use-history";
import { useInitialPrompt } from "@/stores/use-initial-prompt";
import { useModels } from "@/stores/use-models";

export default function Home() {
  const router = useRouter();
  const { submit } = useTitle();
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const initialPrompt = useInitialPrompt((state) => state.initialPrompt);
  const setInitialPrompt = useInitialPrompt((state) => state.setInitialPrompt);
  const selectedModels = useModels((state) => state.selectedModels);
  const createConversationId = useConversationIds(
    (state) => state.createConversationId,
  );
  const addLatestChatToHistory = useHistory(
    (state) => state.addLatestChatToHistory,
  );
  const setTitle = useHistory((state) => state.setTitle);
  const updateLatestChatTitle = useHistory(
    (state) => state.updateLatestChatTitle,
  );

  const chatId = uuidv7();
  const userId = authClient.useSession().data?.user.id;

  const handleSubmit = async () => {
    if (!userId) {
      return router.push("/auth");
    }

    setIsCreatingChat(true);

    try {
      const newConversations = selectedModels.map((model) => {
        const conversationId = createConversationId(model.id);
        return {
          id: conversationId,
          chatId,
          model,
        };
      });

      const newChat = await createChat(chatId, userId);
      addLatestChatToHistory(newChat);

      // Set a temporary title immediately using the first user message (client-only)
      if (initialPrompt.trim().length > 0) {
        setTitle(initialPrompt);
        updateLatestChatTitle(initialPrompt);
      }

      // Kick off async title generation in parallel (don't await)
      if (initialPrompt.trim().length > 0) {
        submit({ input: initialPrompt, chatId });
      }

      // Ensure conversations exist before navigating so streaming can start right away
      await createConversation(newConversations);

      router.push(`/c/${chatId}`);
    } catch (error) {
      toast.error("Error creating chat");
      console.error("Error creating chat:", error);
      setIsCreatingChat(false);
    }
  };

  return (
    <main className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <MultiConversation chatId={chatId} />
      </div>
      <ChatInput
        input={initialPrompt}
        setInput={setInitialPrompt}
        handleSubmit={handleSubmit}
        isCreatingChat={isCreatingChat}
      />
    </main>
  );
}
