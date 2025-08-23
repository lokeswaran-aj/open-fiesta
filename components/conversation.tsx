"use client";

import { AiMessage } from "@/components/ai-message";
import {
  ChatContainerContent,
  ChatContainerRoot,
} from "@/components/prompt-kit/chat-container";
import { UserMessage } from "@/components/user-message";
import { useConversation } from "@/hooks/useConversation";
import type { AI_MODELS } from "@/lib/models";

type Props = {
  model: (typeof AI_MODELS)[number];
};

export const Conversation = (props: Props) => {
  const { model } = props;

  const { messages } = useConversation(model.id);

  return (
    <div className="flex flex-1 h-full w-full flex-col overflow-hidden">
      <div className="p-3 border-b">
        <h3 className="font-medium text-sm">{model.name}</h3>
      </div>
      <ChatContainerRoot className="flex-1">
        <ChatContainerContent className="space-y-4 p-4 max-w-[800px] mx-auto w-full">
          {messages.map((message) => {
            const isAssistant = message.role === "assistant";

            return isAssistant ? (
              <AiMessage key={message.id} message={message} />
            ) : (
              <UserMessage key={message.id} message={message} />
            );
          })}
        </ChatContainerContent>
      </ChatContainerRoot>
    </div>
  );
};
