import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { initializeOTEL } from "langsmith/experimental/otel/setup";
import { siteConfig } from "@/lib/config";
import { getModel } from "./get-model";
import { getProviderOptions } from "./providerOptions";

export const maxDuration = 60;
initializeOTEL();

export async function POST(req: Request) {
  const {
    messages,
    model,
    userId,
    gateway,
  }: { messages: UIMessage[]; model: string; userId: string; gateway: string } =
    await req.json();

  if (model.startsWith("claude-opus")) {
    return new Response("Bro! I am going bankrupt🥺", { status: 400 });
  }

  const result = streamText({
    model: getModel(model, gateway),
    messages: [
      {
        role: "assistant",
        content: siteConfig.systemPrompt,
      },
      ...convertToModelMessages(messages),
    ],
    providerOptions: getProviderOptions(model),
    onError: (error) => {
      console.dir(error, { depth: null });
    },

    experimental_telemetry: {
      isEnabled: true,
      metadata: {
        ls_run_name: model,
        user_id: userId,
        environment: process.env.NODE_ENV,
      },
    },
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  });
}
