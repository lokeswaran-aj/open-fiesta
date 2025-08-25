"use client";
import { ChatInput } from "@/components/chat-input";
import { Header } from "@/components/header";
import { MultiConversation } from "@/components/multi-conversation";
import { useInitialPrompt } from "@/stores/use-initial-prompt";

export default function Home() {
  const initialPrompt = useInitialPrompt((state) => state.initialPrompt);
  const setInitialPrompt = useInitialPrompt((state) => state.setInitialPrompt);

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden">
      <Header />
      <main className="flex flex-col h-full max-h-full overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <MultiConversation />
        </div>
        <div className="flex-shrink-0 flex flex-col items-center gap-2 p-4">
          <ChatInput input={initialPrompt} setInput={setInitialPrompt} />
        </div>
      </main>
    </div>
  );
}
