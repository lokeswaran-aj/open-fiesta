import { SidebarMenuItem } from "@/components/ui/sidebar";
import { ChatHistoryItemEdit } from "./chat-history-item-edit";
import { ChatHistoryItemView } from "./chat-history-item-view";

interface ChatHistoryItemProps {
  item: { id: string; title: string };
  isEditing: boolean;
  editingTitle: string;
  onRename: (chatId: string, currentTitle: string) => void;
  onDelete: (chatId: string) => void;
  onSave: (chatId: string) => void;
  onCancel: () => void;
  onChange: (value: string) => void;
  onClick: () => void;
  isMobile: boolean;
}

export const ChatHistoryItem = ({
  item,
  isEditing,
  editingTitle,
  onRename,
  onDelete,
  onSave,
  onCancel,
  onChange,
  onClick,
  isMobile,
}: ChatHistoryItemProps) => {
  return (
    <SidebarMenuItem>
      {isEditing ? (
        <ChatHistoryItemEdit
          title={editingTitle}
          onSave={() => onSave(item.id)}
          onCancel={onCancel}
          onChange={onChange}
        />
      ) : (
        <ChatHistoryItemView
          item={item}
          onRename={onRename}
          onDelete={onDelete}
          onClick={onClick}
          isMobile={isMobile}
        />
      )}
    </SidebarMenuItem>
  );
};
