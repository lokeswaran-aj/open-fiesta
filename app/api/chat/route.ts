import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { initializeOTEL } from "langsmith/experimental/otel/setup";
import { getModel } from "./get-model";
import { getProviderOptions } from "./providerOptions";

export const maxDuration = 60;
initializeOTEL();

export async function POST(req: Request) {
  try {
    const { messages, model }: { messages: UIMessage[]; model: string } =
      await req.json();

    const result = streamText({
      model: getModel(model),
      messages: convertToModelMessages(messages),
      system:
        "You are a friendly assistant! Keep your responses concise and helpful.",
      providerOptions: getProviderOptions(model),
      onError: (error) => {
        console.dir(error, { depth: null });
      },

      experimental_telemetry: {
        isEnabled: true,
        metadata: {
          ls_run_name: `open-fiesta`,
          environment: process.env.NODE_ENV,
        },
      },
    });

    return result.toUIMessageStreamResponse({
      sendReasoning: true,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      error instanceof Error ? error.message : "Failed to generate response",
      {
        status: 500,
      },
    );
  }
}
