"use client";
import { useEffect, useRef } from "react";
import { ChatInput } from "@/components/chat-input";
import { MultiConversation } from "@/components/multi-conversation";
import { useInitialPrompt } from "@/stores/use-initial-prompt";
import { useInput } from "@/stores/use-input";

export default function Chat() {
  const input = useInput((state) => state.input);
  const setInput = useInput((state) => state.setInput);
  const setShouldSubmit = useInput((state) => state.setShouldSubmit);
  const initialPrompt = useInitialPrompt((state) => state.initialPrompt);
  const setInitialPrompt = useInitialPrompt((state) => state.setInitialPrompt);
  const hasRun = useRef(false);
  useEffect(() => {
    if (initialPrompt && !hasRun.current) {
      hasRun.current = true;
      setInput(initialPrompt);
      setShouldSubmit(true);
      setInitialPrompt("");
    }
  }, [initialPrompt, setInput, setShouldSubmit, setInitialPrompt]);

  return (
    <main className="flex flex-col h-full max-h-full overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <MultiConversation />
      </div>
      <ChatInput input={input} setInput={setInput} />
    </main>
  );
}
