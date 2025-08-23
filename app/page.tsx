import { ChatInput } from "@/components/chat-input";
import { Conversation } from "@/components/conversation";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="flex flex-col  size-full p-4 items-center gap-2">
      <Conversation />
      <ChatInput />
      <Footer />
    </main>
  );
}
