import type { UIMessage } from "@ai-sdk/react";
import { Logo } from "@/components/logo";
import { Markdown } from "@/components/prompt-kit/markdown";
import { Message, MessageAvatar } from "@/components/prompt-kit/message";

type Props = {
  message: UIMessage;
};

export const AiMessage = ({ message }: Props) => {
  return (
    <Message className="justify-start">
      <div className="flex items-start mt-2.5 mr-[-10px]">
        <MessageAvatar className="size-5" component={Logo} />
      </div>
      <div className="max-w-[85%] flex-1 sm:max-w-[75%]">
        <div className="prose p-2">
          {message.parts.map((part) => {
            if (part.type === "text") {
              return (
                <Markdown key={`${message.id}-${part.text}`}>
                  {part.text}
                </Markdown>
              );
            } else if (part.type === "reasoning") {
              return (
                <p key={`${message.id}-${part.text}`}>
                  <strong>Reasoning:</strong> {part.text}
                </p>
              );
            }
            return null;
          })}
        </div>
      </div>
    </Message>
  );
};
