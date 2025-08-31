import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getChatWithConversationsWithMessages } from "@/actions/chat";
import { Chat } from "@/components/chat";
import { auth } from "@/lib/auth";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ChatPage(props: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/auth");
  }

  const { id } = await props.params;
  const chat = await getChatWithConversationsWithMessages(id);

  return (
    <main className="flex flex-col h-full max-h-full overflow-hidden">
      <Chat chat={chat} />
    </main>
  );
}
