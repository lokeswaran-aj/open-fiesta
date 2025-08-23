import type { UIMessage } from "@ai-sdk/react";
import { Markdown } from "@/components/prompt-kit/markdown";
import { Message, MessageAvatar } from "@/components/prompt-kit/message";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "./prompt-kit/reasoning";
import Icons from "./ui/icons";

type Props = {
  message: UIMessage;
  isStreaming: boolean;
};

export const AiMessage = (props: Props) => {
  const { message, isStreaming } = props;
  return (
    <Message className="justify-start">
      <div className="flex items-start mt-2.5 mr-[-10px]">
        <MessageAvatar className="size-5" component={Icons.logo} />
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
                  isStreaming={isStreaming}
                  key={`${message.id}-reasoning-${index}`}
                >
                  {isStreaming ? (
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
