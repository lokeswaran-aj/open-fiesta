"use client";

import { useState } from "react";
import { Conversation } from "./conversation";

export const MultiConversation = () => {
  const [conversationCount] = useState(7);
  return (
    <div className="flex h-full overflow-x-auto">
      {Array.from({ length: conversationCount }, (_, index) => (
        <div
          key={index}
          className="flex-shrink-0 border-r border-b border-gray-300 dark:border-gray-700 last:border-r-0 w-[400px] min-w-[400px] max-sm:w-full max-sm:min-w-full"
        >
          <Conversation />
        </div>
      ))}
    </div>
  );
};
