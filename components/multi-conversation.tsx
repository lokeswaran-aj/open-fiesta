"use client";
import { useModels } from "@/stores/use-models";
import { Conversation } from "./conversation";

export const MultiConversation = () => {
  const selectedModels = useModels((state) => state.selectedModels);

  return (
    <div className="flex h-full overflow-x-auto border-b border-gray-300 dark:border-gray-700">
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
