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
    <Message className="justify-end">
      <div className="max-w-[85%] flex-1 sm:max-w-[75%]">
        {message.parts.map((part, index) => {
          if (part.type === "text") {
            return (
              <Fragment key={`${message.id}-text-${index}`}>
                <MessageContent className="bg-primary text-primary-foreground rounded-2xl px-4 py-2 min-w-fit max-w-[85%] sm:max-w-[75%] justify-self-end">
                  {part.text}
                </MessageContent>
                <MessageActions className="flex gap-2 flex-row-reverse">
                  {message.parts.filter((part) => part.type === "text").length >
                    0 && (
                    <CopyAction
                      text={message.parts
                        .filter((part) => part.type === "text")
                        .map((part) => part.text)
                        .join("\n")}
                    />
                  )}
                </MessageActions>
              </Fragment>
            );
          }
          return null;
        })}
      </div>
    </Message>
  );
};
