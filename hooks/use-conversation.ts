import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import type { Model } from "@/lib/types";
import { useApiKey } from "@/stores/use-api-key";
import { useInput } from "@/stores/use-input";

export const useConversation = (
  model: Model,
  chatId: string,
  conversationId: string,
  initialMessages: UIMessage[],
) => {
  const input = useInput((state) => state.input);
  const inputId = useInput((state) => state.inputId);
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

  const lastInputIdRef = useRef(inputId);

  useEffect(() => {
    lastInputIdRef.current = inputId;
  }, [inputId]);

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
    }),
    messages: initialMessages,
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
      sendMessage(
        {
          text: input,
        },
        {
          body: {
            chatId,
            lastInputId: lastInputIdRef.current,
            fullModelId: model.id,
            isFree: model.isFree,
            apikey: apiKey[model.gateway as keyof typeof apiKey],
          },
        },
      );
      setShouldSubmit(false);
    }
  }, [
    model.id,
    input,
    shouldSubmit,
    sendMessage,
    setShouldSubmit,
    setStreamingModelId,
    apiKey,
    model.gateway,
    chatId,
    model.isFree,
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
