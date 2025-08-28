import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { initializeOTEL } from "langsmith/experimental/otel/setup";
import { getChat } from "@/db/chat";
import type { Gateway } from "@/lib/types";
import { prepareModelAndMessages } from "./prepare-model-and-messages";
import { getProviderOptions } from "./providerOptions";

export const maxDuration = 60;
initializeOTEL();

type ChatRequest = {
  id: string;
  chatId: string;
  messages: UIMessage[];
  fullModelId: string;
  userId: string;
  isFree: boolean;
  apikey?: string;
};

export async function POST(req: Request) {
  try {
    const {
      id: conversationId,
      chatId,
      messages,
      fullModelId,
      userId,
      apikey,
      isFree,
    }: ChatRequest = await req.json();

    console.log(chatId, conversationId);

    if (!isFree && !apikey?.trim().length) {
      return new Response("API key is required", { status: 403 });
    }

    const [gateway, modelId] = fullModelId.split(":");

    if (!gateway || !modelId) {
      return new Response("Invalid model", { status: 400 });
    }

    const chat = await getChat(chatId);

    if (!chat || chat.userId !== userId) {
      return new Response("Chat not found", { status: 404 });
    }

    const modelMessages = convertToModelMessages(messages);

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
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}
