"use client";
import { AI_MODELS } from "@/lib/models";
import { Conversation } from "./conversation";

export const MultiConversation = () => {
  return (
    <div className="flex h-full overflow-x-auto">
      {AI_MODELS.map((model) => (
        <div
          key={model.id}
          className="flex-shrink-0 border-r border-b border-gray-300 dark:border-gray-700 last:border-r-0 w-[400px] min-w-[400px] max-sm:w-full max-sm:min-w-full"
        >
          <Conversation model={model} />
        </div>
      ))}
    </div>
  );
};
