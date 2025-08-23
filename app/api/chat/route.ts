import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { initializeOTEL } from "langsmith/experimental/otel/setup";

export const maxDuration = 60;
initializeOTEL();

export async function POST(req: Request) {
  const { messages, model }: { messages: UIMessage[]; model: string } =
    await req.json();

  const result = streamText({
    model,
    messages: convertToModelMessages(messages),
    system:
      "You are a friendly assistant! Keep your responses concise and helpful.",
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
}
