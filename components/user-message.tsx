import type { UIMessage } from "@ai-sdk/react";
import { Message, MessageContent } from "@/components/prompt-kit/message";

type Props = {
  message: UIMessage;
};

export const UserMessage = ({ message }: Props) => {
  return (
    <Message className="justify-end">
      <div className="max-w-[85%] flex-1 sm:max-w-[75%]">
        {message.parts.map((part) => {
          if (part.type === "text") {
            return (
              <MessageContent
                key={`${message.id}-${part.text}`}
                className="bg-primary text-primary-foreground rounded-2xl px-4 py-2 min-w-fit max-w-[85%] sm:max-w-[75%] justify-self-end"
              >
                {part.text}
              </MessageContent>
            );
          } else {
            return null;
          }
        })}
      </div>
    </Message>
  );
};
