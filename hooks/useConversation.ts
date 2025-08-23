import { useChat } from "@ai-sdk/react";
import { useEffect } from "react";
import { useInput } from "@/stores/use-input";

export const useConversation = (modelId: string) => {
  const input = useInput((state) => state.input);
  const shouldSubmit = useInput((state) => state.shouldSubmit);
  const setShouldSubmit = useInput((state) => state.setShouldSubmit);
  const shouldStop = useInput((state) => state.shouldStop);
  const setShouldStop = useInput((state) => state.setShouldStop);
  const setStreamingModelId = useInput((state) => state.setStreamingModelId);
  const removeStreamedModelId = useInput(
    (state) => state.removeStreamedModelId,
  );

  const { messages, sendMessage, stop } = useChat({
    id: `${modelId}-conversation`,
    onFinish: () => {
      removeStreamedModelId(modelId);
    },
    onError: () => {
      removeStreamedModelId(modelId);
    },
  });

  useEffect(() => {
    if (shouldSubmit) {
      setStreamingModelId(modelId);
      sendMessage(
        {
          text: input,
        },
        {
          body: {
            model: modelId,
          },
        },
      );
      setShouldSubmit(false);
    }
  }, [
    input,
    shouldSubmit,
    modelId,
    sendMessage,
    setShouldSubmit,
    setStreamingModelId,
  ]);

  useEffect(() => {
    if (shouldStop) {
      stop();
      setShouldStop(false);
      removeStreamedModelId(modelId);
    }
  }, [shouldStop, setShouldStop, stop, removeStreamedModelId, modelId]);

  return { messages };
};
