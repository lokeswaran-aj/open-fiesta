import { ChatInput } from "@/components/chat-input";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { MultiConversation } from "@/components/multi-conversation";

export default function Home() {
  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden">
      <Header />
      <main className="flex flex-col h-full max-h-full overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <MultiConversation />
        </div>
        <div className="flex-shrink-0 flex flex-col items-center gap-2 p-4">
          <ChatInput />
          <Footer />
        </div>
      </main>
    </div>
  );
}
