import { Logo } from "@/components/logo";
import { Markdown } from "@/components/prompt-kit/markdown";
import { Message, MessageAvatar } from "@/components/prompt-kit/message";
import type { ChatMessage } from "@/lib/types";

type Props = {
  message: ChatMessage;
};

export const AiMessage = ({ message }: Props) => {
  return (
    <Message className="justify-start">
      <div className="flex items-start mt-2.5 mr-[-10px]">
        <MessageAvatar className="size-5" component={Logo} />
      </div>
      <div className="max-w-[85%] flex-1 sm:max-w-[75%]">
        <div className="prose p-2">
          <Markdown>{message.content}</Markdown>
        </div>
      </div>
    </Message>
  );
};
