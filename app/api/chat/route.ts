import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { initializeOTEL } from "langsmith/experimental/otel/setup";
import type { Gateway } from "@/lib/types";
import { prepareModelAndMessages } from "./prepare-model-and-messages";
import { getProviderOptions } from "./providerOptions";

export const maxDuration = 60;
initializeOTEL();

type ChatRequest = {
  messages: UIMessage[];
  fullModelId: string;
  userId: string;
  isFree: boolean;
  apikey?: string;
};

export async function POST(req: Request) {
  const { messages, fullModelId, userId, apikey, isFree }: ChatRequest =
    await req.json();

  if (!isFree && !apikey?.trim().length) {
    return new Response("API key is required", { status: 403 });
  }

  const modelMessages = convertToModelMessages(messages);
  const [gateway, modelId] = fullModelId.split(":");

  if (!gateway || !modelId) {
    return new Response("Invalid model", { status: 400 });
  }

  const result = streamText({
    ...prepareModelAndMessages(
      modelId,
      gateway as Gateway,
      modelMessages,
      apikey,
    ),
    providerOptions: getProviderOptions(modelId),
    onError: (error) => {
      console.dir(error, { depth: null });
    },

    experimental_telemetry: {
      isEnabled: true,
      metadata: {
        ls_run_name: fullModelId,
        user_id: userId,
        environment: process.env.NODE_ENV,
      },
    },
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  });
}
