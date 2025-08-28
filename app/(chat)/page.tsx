"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { v7 as uuidv7 } from "uuid";
import { createChat } from "@/actions/chat";
import { ChatInput } from "@/components/chat-input";
import { MultiConversation } from "@/components/multi-conversation";
import { authClient } from "@/lib/auth-client";
import { useConversationIds } from "@/stores/use-conversation-ids";
import { useInitialPrompt } from "@/stores/use-initial-prompt";
import { useModels } from "@/stores/use-models";

export default function Home() {
  const router = useRouter();
  const initialPrompt = useInitialPrompt((state) => state.initialPrompt);
  const setInitialPrompt = useInitialPrompt((state) => state.setInitialPrompt);
  const selectedModels = useModels((state) => state.selectedModels);
  const createConversationId = useConversationIds(
    (state) => state.createConversationId,
  );
  const clearConversationIds = useConversationIds(
    (state) => state.clearConversationIds,
  );
  const chatId = uuidv7();
  const userId = authClient.useSession().data?.user.id;
  const handleSubmit = async () => {
    if (!userId) {
      return router.push("/auth");
    }
    selectedModels.forEach((model) => {
      createConversationId(model.id);
    });

    await createChat(chatId, userId);
    router.push(`/c/${chatId}`);
  };

  useEffect(() => {
    clearConversationIds();
  }, [clearConversationIds]);

  return (
    <main className="flex flex-col h-full max-h-full overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <MultiConversation chatId={chatId} />
      </div>
      <ChatInput
        input={initialPrompt}
        setInput={setInitialPrompt}
        handleSubmit={handleSubmit}
      />
    </main>
  );
}
