import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import type { Model } from "@/lib/types";
import { useApiKey } from "@/stores/use-api-key";
import { useInput } from "@/stores/use-input";

export const useConversation = (
  model: Model,
  chatId: string,
  conversationId: string,
) => {
  const input = useInput((state) => state.input);
  const aimlApiKey = useApiKey((state) => state.aimlApiKey);
  const openRouterApiKey = useApiKey((state) => state.openRouterApiKey);
  const vercelApiKey = useApiKey((state) => state.vercelApiKey);
  const shouldSubmit = useInput((state) => state.shouldSubmit);
  const setShouldSubmit = useInput((state) => state.setShouldSubmit);
  const shouldStop = useInput((state) => state.shouldStop);
  const setShouldStop = useInput((state) => state.setShouldStop);
  const setStreamingModelId = useInput((state) => state.setStreamingModelId);
  const removeStreamedModelId = useInput(
    (state) => state.removeStreamedModelId,
  );
  const { data } = authClient.useSession();
  const [apiKey, setApiKey] = useState({
    openrouter: openRouterApiKey,
    vercel: vercelApiKey,
    aimlapi: aimlApiKey,
  });

  useEffect(() => {
    setApiKey({
      openrouter: openRouterApiKey,
      vercel: vercelApiKey,
      aimlapi: aimlApiKey,
    });
  }, [openRouterApiKey, vercelApiKey, aimlApiKey]);

  const { messages, sendMessage, stop, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        chatId,
        fullModelId: model.id,
        userId: data?.user?.id,
        isFree: model.isFree,
        apikey: apiKey[model.gateway as keyof typeof apiKey],
      },
    }),
    id: conversationId,
    onFinish: () => {
      removeStreamedModelId(model.id);
    },
    onError: (error) => {
      console.dir(error, { depth: null });
      removeStreamedModelId(model.id);
    },
  });

  useEffect(() => {
    if (shouldSubmit) {
      setStreamingModelId(model.id);
      sendMessage({
        text: input,
      });
      setShouldSubmit(false);
    }
  }, [
    model.id,
    input,
    shouldSubmit,
    sendMessage,
    setShouldSubmit,
    setStreamingModelId,
  ]);

  useEffect(() => {
    if (shouldStop) {
      stop();
      setShouldStop(false);
      removeStreamedModelId(model.id);
    }
  }, [shouldStop, setShouldStop, stop, removeStreamedModelId, model.id]);

  return { messages, status, error };
};
