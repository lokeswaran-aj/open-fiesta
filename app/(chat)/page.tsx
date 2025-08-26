import { HomeInput } from "@/components/home-input";
import { MultiConversation } from "@/components/multi-conversation";

export default function Home() {
  return (
    <main className="flex flex-col h-full max-h-full overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <MultiConversation />
      </div>
      <HomeInput />
    </main>
  );
}
