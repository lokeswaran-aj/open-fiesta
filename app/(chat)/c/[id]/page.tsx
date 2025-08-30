import { getChatWithConversationsWithMessages } from "@/actions/chat";
import { Chat } from "@/components/chat";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ChatPage(props: Props) {
  const { id } = await props.params;
  const chat = await getChatWithConversationsWithMessages(id);
  return (
    <main className="flex flex-col h-full max-h-full overflow-hidden">
      <Chat chat={chat} />
    </main>
  );
}
