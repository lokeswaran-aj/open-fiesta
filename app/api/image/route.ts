import { google } from "@ai-sdk/google";
import { convertToModelMessages, generateText, type UIMessage } from "ai";
import { initializeOTEL } from "langsmith/experimental/otel/setup";
import { v7 as uuidv7 } from "uuid";
import { auth } from "@/lib/auth";

export const maxDuration = 60;
initializeOTEL();

export const POST = async (req: Request) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    const userId = session?.user?.id;

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const { messages: messagesData }: { messages: UIMessage[] } =
      await req.json();

    const { content } = await generateText({
      model: google("gemini-2.5-flash-image-preview"),
      providerOptions: {
        google: { responseModalities: ["TEXT", "IMAGE"] },
      },
      messages: convertToModelMessages(messagesData),
      system:
        "You are a helpful assistant that generates images based on a prompt.",
      experimental_telemetry: {
        isEnabled: true,
        metadata: {
          ls_run_name: "image",
          user_id: userId,
          environment: process.env.NODE_ENV,
        },
      },
    });

    return Response.json({ role: "assistant", parts: content, id: uuidv7() });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
};
