"use client";
import { Settings2Icon } from "lucide-react";
import { useDialogState } from "@/stores/use-dialog-state";
import { useModels } from "@/stores/use-models";
import { Conversation } from "./conversation";
import { Button } from "./ui/button";

type Props = {
  chatId: string;
};

export const MultiConversation = (props: Props) => {
  const { chatId } = props;
  const selectedModels = useModels((state) => state.selectedModels);
  const setModelSelectorOpen = useDialogState(
    (state) => state.setModelSelectorOpen,
  );
  const handleOpenModelSelector = () => {
    setModelSelectorOpen(true);
  };
  const isLoading = useModels((state) => state.isLoading);

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex h-full overflow-x-auto">
      {selectedModels.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-gray-500 dark:text-gray-400">
            Pick a model to vibe with 💬✨
          </p>
          <Button variant="outline" size="sm" onClick={handleOpenModelSelector}>
            <Settings2Icon className="size-4" />
            <span>Pick a model</span>
          </Button>
        </div>
      )}
      {selectedModels.map((model) => (
        <div
          key={model.id}
          className="flex-shrink-0 border-r border-gray-300 dark:border-gray-700 w-[400px] min-w-[400px] max-sm:w-full max-sm:min-w-full"
        >
          <Conversation model={model} chatId={chatId} />
        </div>
      ))}
    </div>
  );
};
