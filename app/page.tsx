import { ChatInput } from "@/components/chat-input";
import { Footer } from "@/components/footer";
import { MultiConversation } from "@/components/multi-conversation";

export default function Home() {
  return (
    <main className="flex flex-col h-screen max-h-screen overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <MultiConversation />
      </div>
      <div className="flex-shrink-0 flex flex-col items-center gap-2 p-4">
        <ChatInput />
        <Footer />
      </div>
    </main>
  );
}
