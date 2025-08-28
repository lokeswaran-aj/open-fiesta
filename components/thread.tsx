import { AiMessage } from "@/components/ai-message";
import {
  ChatContainerContent,
  ChatContainerRoot,
} from "@/components/prompt-kit/chat-container";
import { UserMessage } from "@/components/user-message";
import { useConversation } from "@/hooks/use-conversation";
import type { Model } from "@/lib/types";
import { ErrorMessage } from "./error-message";
import { LoadingMessage } from "./loading-message";

type Props = {
  model: Model;
  chatId: string;
  conversationId: string;
};

export const Thread = (props: Props) => {
  const { model, chatId, conversationId } = props;
  const { messages, status, error } = useConversation(
    model,
    chatId,
    conversationId,
  );
  return (
    <ChatContainerRoot className="flex-1">
      <ChatContainerContent className="space-y-4 p-4 max-w-[800px] mx-auto w-full">
        {messages.map((message, index) => {
          const isAssistant = message.role === "assistant";

          return isAssistant ? (
            <AiMessage
              key={message.id}
              provider={model.provider}
              message={message}
              isStreaming={
                status === "streaming" && index === messages.length - 1
              }
            />
          ) : (
            <UserMessage key={message.id} message={message} />
          );
        })}
        {status === "submitted" && <LoadingMessage provider={model.provider} />}
        {error && (
          <ErrorMessage
            provider={model.provider}
            errorMessage={error.message}
          />
        )}
      </ChatContainerContent>
    </ChatContainerRoot>
  );
};
