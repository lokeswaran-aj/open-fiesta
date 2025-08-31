import type { UIMessage } from "@ai-sdk/react";
import { Fragment } from "react";
import {
  Message,
  MessageActions,
  MessageContent,
} from "@/components/prompt-kit/message";
import { CopyAction } from "./copy-action";

type Props = {
  message: UIMessage;
};

export const UserMessage = ({ message }: Props) => {
  return (
    <Message className="group flex flex-col items-end gap-1">
      {message.parts.map((part, index) => {
        if (part.type === "text") {
          return (
            <Fragment key={`${message.id}-text-${index}`}>
              <MessageContent className="bg-primary text-primary-foreground min-w-fit max-w-[85%] rounded-3xl px-3 py-1.5 sm:max-w-[75%]">
                {part.text}
              </MessageContent>
              <MessageActions className="flex gap-0">
                <CopyAction text={part.text} />
              </MessageActions>
            </Fragment>
          );
        }
        return null;
      })}
    </Message>
  );
};
