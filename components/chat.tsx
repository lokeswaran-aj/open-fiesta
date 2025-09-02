"use client";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import type { ChatWithConversationsWithMessages } from "@/actions/chat";
import { ChatInput } from "@/components/chat-input";
import { MultiConversation } from "@/components/multi-conversation";
import { useConversationIds } from "@/stores/use-conversation-ids";
import { useInitialPrompt } from "@/stores/use-initial-prompt";
import { useInput } from "@/stores/use-input";
import { useModels } from "@/stores/use-models";

type Props = {
  chat: ChatWithConversationsWithMessages | null;
};

export const Chat = (props: Props) => {
  const { chat } = props;
  const { id } = useParams();
  const hasSetModels = useRef(false);
  const hasSubmittedInput = useRef(false);
  const input = useInput((state) => state.input);
  const setInput = useInput((state) => state.setInput);
  const setShouldSubmit = useInput((state) => state.setShouldSubmit);
  const initialPrompt = useInitialPrompt((state) => state.initialPrompt);
  const setInitialPrompt = useInitialPrompt((state) => state.setInitialPrompt);
  const setConversationIds = useConversationIds(
    (state) => state.setConversationIds,
  );
  const conversationIds = useConversationIds((state) => state.conversationIds);
  const setSelectedModels = useModels((state) => state.setSelectedModels);
  const models = useModels((state) => state.models);

  useEffect(() => {
    if (hasSetModels.current) return;
    hasSetModels.current = true;
    if (chat && models.length > 0) {
      const { conversations } = chat;
      const conversationIds = conversations.map(({ conversation }) => ({
        modelId: conversation.model.id,
        conversationId: conversation.id,
      }));
      const selectedModels = conversations
        .map(({ conversation }) =>
          models.find((model) => model.id === conversation.model.id),
        )
        .filter(
          (model): model is NonNullable<typeof model> => model !== undefined,
        );
      setConversationIds(conversationIds);
      setSelectedModels(selectedModels);
    }
  }, [chat, models, setConversationIds, setSelectedModels]);

  useEffect(() => {
    if (
      initialPrompt &&
      !hasSubmittedInput.current &&
      Object.keys(conversationIds).length > 0
    ) {
      hasSubmittedInput.current = true;
      setInput(initialPrompt);
      setShouldSubmit(true);
      setInitialPrompt("");
    }
  }, [
    initialPrompt,
    setInput,
    setShouldSubmit,
    setInitialPrompt,
    conversationIds,
  ]);

  const handleSubmit = () => {
    setShouldSubmit(true);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <MultiConversation
          chatId={id as string}
          conversations={chat?.conversations}
        />
      </div>
      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};
