import { Chat } from "@/components/chat";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto relative size-full p-4 h-dvh">
      <main className="flex flex-col h-full items-center gap-2">
        <Chat />
        <Footer />
      </main>
    </div>
  );
}
