"use client";

import { AiMessage } from "@/components/ai-message";
import {
  ChatContainerContent,
  ChatContainerRoot,
} from "@/components/prompt-kit/chat-container";
import { UserMessage } from "@/components/user-message";
import { useConversation } from "@/hooks/useConversation";
import type { AI_MODELS } from "@/lib/models";
import { Loading } from "./loading";
import { ModelLogo } from "./model-selection/model-logo";

type Props = {
  model: (typeof AI_MODELS)[number];
};

export const Conversation = (props: Props) => {
  const { model } = props;

  const { messages, status } = useConversation(model.id);

  return (
    <div className="flex flex-1 h-full w-full flex-col overflow-hidden">
      <div className="p-3 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <ModelLogo modelId={model.id} />
          <h3 className="font-medium text-sm">{model.name}</h3>
        </div>
      </div>
      <ChatContainerRoot className="flex-1">
        <ChatContainerContent className="space-y-4 p-4 max-w-[800px] mx-auto w-full">
          {messages.map((message, index) => {
            const isAssistant = message.role === "assistant";

            return isAssistant ? (
              <AiMessage
                key={message.id}
                modelId={model.id}
                message={message}
                isStreaming={
                  status === "streaming" && index === messages.length - 1
                }
              />
            ) : (
              <UserMessage key={message.id} message={message} />
            );
          })}
          {status === "submitted" && <Loading modelId={model.id} />}
        </ChatContainerContent>
      </ChatContainerRoot>
    </div>
  );
};
