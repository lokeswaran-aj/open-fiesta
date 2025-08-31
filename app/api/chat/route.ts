import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { initializeOTEL } from "langsmith/experimental/otel/setup";
import prettyMilliseconds from "pretty-ms";
import { getChat } from "@/actions/chat";
import { saveMessage } from "@/actions/messages";
import { auth } from "@/lib/auth";
import { handleRateLimit } from "@/lib/ratelimit";
import type { Gateway } from "@/lib/types";
import { prepareModelAndMessages } from "./prepare-model-and-messages";
import { getProviderOptions } from "./providerOptions";

export const maxDuration = 60;
initializeOTEL();

type ChatRequest = {
  id: string;
  chatId: string;
  lastInputId: string;
  messages: UIMessage[];
  fullModelId: string;
  isFree: boolean;
  apikey?: string;
};

export async function POST(req: Request) {
  try {
    const {
      id: conversationId,
      lastInputId,
      messages,
      chatId,
      fullModelId,
      isFree,
      apikey,
    }: ChatRequest = await req.json();

    const session = await auth.api.getSession({
      headers: req.headers,
    });
    const userId = session?.user?.id;

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!isFree && !apikey?.trim().length) {
      return new Response("API key is required", { status: 403 });
    }

    if (!apikey) {
      const { allowed, resetTime } = await handleRateLimit(userId, lastInputId);

      if (!allowed) {
        return new Response(
          `Rate limit exceeded. Either bring your own key or wait for "${prettyMilliseconds(
            resetTime.getTime() - Date.now(),
            { keepDecimalsOnWholeSeconds: false },
          )}"`,
          { status: 429 },
        );
      }
    }

    const [gateway, modelId] = fullModelId.split(":");

    if (!gateway || !modelId) {
      return new Response("Invalid model", { status: 400 });
    }

    const chat = await getChat(chatId);

    if (!chat || chat.userId !== userId) {
      return new Response("Chat not found", { status: 404 });
    }

    await saveMessage(conversationId, "user", messages.at(-1)?.parts ?? []);
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
          own_api_key: apikey ? "yes" : "no",
        },
      },
      onFinish: async (completion) => {
        await saveMessage(
          conversationId,
          "assistant",
          completion.content as UIMessage["parts"],
        );
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
