import type { UIMessage } from "@ai-sdk/react";
import {
  Message,
  MessageActions,
  MessageAvatar,
  MessageContent,
} from "@/components/prompt-kit/message";
import { cn } from "@/lib/utils";
import { CopyAction } from "./copy-action";
import { ModelLogo } from "./model-selection/model-logo";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "./prompt-kit/reasoning";

type Props = {
  message: UIMessage;
  isStreaming: boolean;
  provider: string;
};

export const AiMessage = (props: Props) => {
  const { message, isStreaming, provider } = props;

  return (
    <Message className="justify-start">
      <div className="flex items-start mt-0.5">
        <MessageAvatar
          className="size-5 flex items-center justify-center"
          component={<ModelLogo provider={provider} />}
        />
      </div>
      <div className="group flex w-full flex-col gap-0">
        {message.parts.map((part, index) => {
          if (part.type === "text") {
            return (
              <MessageContent
                key={`${message.id}-${part.type}-${index}`}
                className="text-foreground prose dark:prose-invert w-full flex-1 rounded-lg bg-transparent p-0"
                markdown
              >
                {part.text}
              </MessageContent>
            );
          } else if (part.type === "reasoning") {
            return (
              <Reasoning
                isStreaming={isStreaming}
                key={`${message.id}-${part.type}-${index}`}
              >
                <ReasoningTrigger>Reasoning</ReasoningTrigger>
                <ReasoningContent
                  markdown
                  className="ml-2 border-l-2 border-l-slate-200 px-2 pb-1 dark:border-l-slate-700 prose dark:prose-invert"
                >
                  {part.text}
                </ReasoningContent>
              </Reasoning>
            );
          }
          return null;
        })}
        <MessageActions
          className={cn("-ml-2.5 flex gap-0", isStreaming && "opacity-0")}
        >
          <CopyAction
            text={message.parts
              .filter((part) => part.type === "text")
              .map((part) => part.text)
              .join("")}
          />
        </MessageActions>
      </div>
    </Message>
  );
};
