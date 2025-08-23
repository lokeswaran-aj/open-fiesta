import { convertToModelMessages, streamText, type UIMessage } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, model }: { messages: UIMessage[]; model: string } =
    await req.json();

  const result = streamText({
    model,
    messages: convertToModelMessages(messages),
    system:
      "You are a friendly assistant! Keep your responses concise and helpful.",
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  });
}
