import { ChatInput } from "@/components/chat-input";
import { Footer } from "@/components/footer";
import { GitHubLink } from "@/components/github-link";
import { MultiConversation } from "@/components/multi-conversation";
import { ThemeSwitcher } from "@/components/theme-changer";

export default function Home() {
  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden">
      <header className="flex h-16 shrink-0 items-center justify-end gap-2 border-b">
        <div className="flex items-center gap-2 px-4">
          <GitHubLink />
          <ThemeSwitcher />
        </div>
      </header>
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
