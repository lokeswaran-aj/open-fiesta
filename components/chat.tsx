"use client";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import type { getChatWithConversationsWithMessages } from "@/actions/chat";
import { ChatInput } from "@/components/chat-input";
import { MultiConversation } from "@/components/multi-conversation";
import { useInitialPrompt } from "@/stores/use-initial-prompt";
import { useInput } from "@/stores/use-input";

type Props = {
  chat: Awaited<ReturnType<typeof getChatWithConversationsWithMessages>>;
};

export const Chat = (props: Props) => {
  const { chat } = props;
  console.log("🚀 ~ Chat ~ chat:", chat);
  const { id } = useParams();
  const hasRun2 = useRef(false);
  const input = useInput((state) => state.input);
  const setInput = useInput((state) => state.setInput);
  const setShouldSubmit = useInput((state) => state.setShouldSubmit);
  const initialPrompt = useInitialPrompt((state) => state.initialPrompt);
  const setInitialPrompt = useInitialPrompt((state) => state.setInitialPrompt);

  useEffect(() => {
    if (initialPrompt && !hasRun2.current) {
      hasRun2.current = true;
      setInput(initialPrompt);
      setShouldSubmit(true);
      setInitialPrompt("");
    }
  }, [initialPrompt, setInput, setShouldSubmit, setInitialPrompt]);

  const handleSubmit = () => {
    setShouldSubmit(true);
  };

  return (
    <main className="flex flex-col h-full max-h-full overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <MultiConversation chatId={id as string} />
      </div>
      <ChatInput
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
      />
    </main>
  );
};
