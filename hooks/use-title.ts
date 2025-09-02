"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { v7 as uuidv7 } from "uuid";
import { titleSchema } from "@/lib/types";
import { useHistory } from "@/stores/use-history";

export const useTitle = () => {
  const setTitle = useHistory((state) => state.setTitle);
  const updateLatestChatTitle = useHistory(
    (state) => state.updateLatestChatTitle,
  );
  const { submit } = useObject({
    id: uuidv7(),
    api: "/api/title",
    schema: titleSchema,
    onFinish: (completion) => {
      completion?.object?.title && setTitle(completion.object.title);
      completion?.object?.title &&
        updateLatestChatTitle(completion.object.title);
    },
  });

  return { submit };
};
