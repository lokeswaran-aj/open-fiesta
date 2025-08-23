"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect } from "react";
import { AiMessage } from "@/components/ai-message";
import {
  ChatContainerContent,
  ChatContainerRoot,
} from "@/components/prompt-kit/chat-container";
import { UserMessage } from "@/components/user-message";
import type { AI_MODELS } from "@/lib/models";
import { useInput } from "@/stores/use-input";

type Props = {
  model: (typeof AI_MODELS)[number];
};

export const Conversation = (props: Props) => {
  const { model } = props;
  const setStreamingModelId = useInput((state) => state.setStreamingModelId);
  const removeStreamedModelId = useInput(
    (state) => state.removeStreamedModelId,
  );
  const input = useInput((state) => state.input);
  const shouldSubmit = useInput((state) => state.shouldSubmit);
  const setShouldSubmit = useInput((state) => state.setShouldSubmit);
  const shouldStop = useInput((state) => state.shouldStop);
  const setShouldStop = useInput((state) => state.setShouldStop);

  const { messages, sendMessage, stop } = useChat({
    id: `${model.id}-conversation`,
    onFinish: () => {
      removeStreamedModelId(model.id);
    },
    onError: () => {
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
            model: model.id,
          },
        },
      );
      setShouldSubmit(false);
    }
  }, [
    input,
    shouldSubmit,
    model.id,
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

  return (
    <div className="flex flex-1 h-full w-full flex-col overflow-hidden">
      <div className="p-3 border-b">
        <h3 className="font-medium text-sm">{model.name}</h3>
      </div>
      <ChatContainerRoot className="flex-1">
        <ChatContainerContent className="space-y-4 p-4 max-w-[800px] mx-auto w-full">
          {messages.map((message) => {
            const isAssistant = message.role === "assistant";

            return isAssistant ? (
              <AiMessage key={message.id} message={message} />
            ) : (
              <UserMessage key={message.id} message={message} />
            );
          })}
        </ChatContainerContent>
      </ChatContainerRoot>
    </div>
  );
};
