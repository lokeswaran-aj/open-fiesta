"use client";

import type { UIMessage } from "ai";
import type { ConversationsWithMessages } from "@/actions/chat";
import type { Model } from "@/lib/types";
import { ModelLogo } from "./model-selection/model-logo";
import { Thread } from "./thread";

type Props = {
  model: Model;
  chatId: string;
  conversation?: ConversationsWithMessages;
};

export const Conversation = (props: Props) => {
  const { model, chatId, conversation } = props;

  return (
    <div className="flex flex-1 h-full w-full flex-col overflow-hidden">
      <div className="p-3 border-b border-gray-300 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <ModelLogo provider={model.provider} />
          <h3 className="font-medium text-sm">{model.name}</h3>
        </div>
      </div>
      {conversation && (
        <Thread
          model={model}
          chatId={chatId}
          conversationId={conversation.conversation.id}
          initialMessages={
            conversation.messages.map((message) => ({
              id: message.id,
              role: message.role as "user" | "assistant",
              parts: message.parts,
            })) as UIMessage[]
          }
        />
      )}
    </div>
  );
};
