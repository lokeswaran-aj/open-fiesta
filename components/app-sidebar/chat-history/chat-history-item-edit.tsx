import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatHistoryItemEditProps {
  title: string;
  onSave: () => void;
  onCancel: () => void;
  onChange: (value: string) => void;
}

export const ChatHistoryItemEdit = ({
  title,
  onSave,
  onCancel,
  onChange,
}: ChatHistoryItemEditProps) => {
  return (
    <div className="min-w-0 flex-1 flex items-center gap-1 px-3 py-2">
      <Input
        value={title}
        onChange={(e) => onChange(e.target.value)}
        className="h-6 text-sm border-none bg-transparent p-0 focus-visible:ring-0 flex-1"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSave();
          } else if (e.key === "Escape") {
            onCancel();
          }
        }}
      />
      <Button
        size="sm"
        variant="ghost"
        className="h-6 w-6 p-0 hover:bg-accent"
        onClick={(e) => {
          e.stopPropagation();
          onSave();
        }}
      >
        <Check className="h-3 w-3" />
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="h-6 w-6 p-0 hover:bg-accent"
        onClick={(e) => {
          e.stopPropagation();
          onCancel();
        }}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
};
