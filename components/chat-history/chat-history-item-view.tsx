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
  return (
    <SidebarMenuButton asChild onClick={onClick}>
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
