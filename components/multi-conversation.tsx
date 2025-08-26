"use client";
import { Settings2Icon } from "lucide-react";
import { useModels } from "@/stores/use-models";
import { Conversation } from "./conversation";
import { ModelSelector } from "./model-selection/model-selector";
import { Button } from "./ui/button";

export const MultiConversation = () => {
  const selectedModels = useModels((state) => state.selectedModels);
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
          <ModelSelector
            trigger={
              <Button variant="outline" size="sm">
                <Settings2Icon className="size-4" />
                <span>Pick a model</span>
              </Button>
            }
          />
        </div>
      )}
      {selectedModels.map((model) => (
        <div
          key={model.id}
          className="flex-shrink-0 border-r border-gray-300 dark:border-gray-700 w-[400px] min-w-[400px] max-sm:w-full max-sm:min-w-full"
        >
          <Conversation model={model} />
        </div>
      ))}
    </div>
  );
};
