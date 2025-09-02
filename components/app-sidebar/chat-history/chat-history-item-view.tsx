import { useParams } from "next/navigation";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { ChatHistoryDropdown } from "./chat-history-dropdown";

interface ChatHistoryItemViewProps {
  item: { id: string; title: string };
  onRename: (chatId: string, currentTitle: string) => void;
  onDelete: (chatId: string) => void;
  onClick: () => void;
  isMobile: boolean;
}

export const ChatHistoryItemView = ({
  item,
  onRename,
  onDelete,
  onClick,
  isMobile,
}: ChatHistoryItemViewProps) => {
  const params = useParams();
  const currentChatId = params?.id as string;
  const isSelected = currentChatId === item.id;

  return (
    <SidebarMenuButton
      asChild
      onClick={onClick}
      className={isSelected ? "bg-accent/70 text-accent-foreground" : ""}
    >
      <div className="min-w-0 flex-1">
        <span className="block truncate text-left">{item.title}</span>
        <ChatHistoryDropdown
          item={item}
          onRename={onRename}
          onDelete={onDelete}
          isMobile={isMobile}
        />
      </div>
    </SidebarMenuButton>
  );
};
