import type { UIMessage } from "@ai-sdk/react";
import { Logo } from "@/components/logo";
import { Markdown } from "@/components/prompt-kit/markdown";
import { Message, MessageAvatar } from "@/components/prompt-kit/message";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "./prompt-kit/reasoning";

type Props = {
  message: UIMessage;
  isLoading: boolean;
};

export const AiMessage = (props: Props) => {
  const { message, isLoading } = props;

  return (
    <Message className="justify-start">
      <div className="flex items-start mt-2.5 mr-[-10px]">
        <MessageAvatar className="size-5" component={Logo} />
      </div>
      <div className="max-w-[85%] flex-1 sm:max-w-[75%]">
        <div className="prose p-2">
          {message.parts.map((part, index) => {
            if (part.type === "text") {
              return (
                <Markdown key={`${message.id}-text-${index}`}>
                  {part.text}
                </Markdown>
              );
            } else if (part.type === "reasoning") {
              return (
                <Reasoning
                  isStreaming={isLoading}
                  key={`${message.id}-reasoning-${index}`}
                >
                  {isLoading ? (
                    <ReasoningTrigger>Thinking</ReasoningTrigger>
                  ) : (
                    <ReasoningTrigger>Thoughts</ReasoningTrigger>
                  )}
                  <ReasoningContent
                    markdown
                    className="ml-2 border-l-2 border-l-gray-200 px-2 pb-1 dark:border-l-gray-700"
                  >
                    {part.text}
                  </ReasoningContent>
                </Reasoning>
              );
            }
            return null;
          })}
        </div>
      </div>
    </Message>
  );
};
