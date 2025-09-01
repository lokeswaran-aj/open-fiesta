"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { v7 as uuidv7 } from "uuid";
import { titleSchema } from "@/lib/types";
import { useChat } from "@/stores/use-chat";

export const useTitle = () => {
  const setTitle = useChat((state) => state.setTitle);
  const { submit } = useObject({
    id: uuidv7(),
    api: "/api/title",
    schema: titleSchema,
    onFinish: (completion) => {
      completion?.object?.title && setTitle(completion.object.title);
    },
  });

  return { submit };
};
