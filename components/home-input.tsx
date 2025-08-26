"use client";

import { ChatInput } from "@/components/chat-input";
import { useInitialPrompt } from "@/stores/use-initial-prompt";

export const HomeInput = () => {
  const initialPrompt = useInitialPrompt((state) => state.initialPrompt);
  const setInitialPrompt = useInitialPrompt((state) => state.setInitialPrompt);
  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-2 p-4">
      <ChatInput input={initialPrompt} setInput={setInitialPrompt} />
    </div>
  );
};
