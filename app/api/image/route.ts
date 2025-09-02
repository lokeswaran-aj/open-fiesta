import { type GoogleGenerativeAIProviderOptions, google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { initializeOTEL } from "langsmith/experimental/otel/setup";
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

    const lastMessage = messagesData.at(-1);
    if (!lastMessage) {
      return new Response("No message provided", { status: 400 });
    }

    const result = streamText({
      model: google("gemini-2.5-flash-image-preview"),
      providerOptions: {
        google: {
          responseModalities: ["IMAGE"],
        } as GoogleGenerativeAIProviderOptions,
      },
      messages: convertToModelMessages([lastMessage]),
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
      onFinish: (completion) => {
        console.dir(completion.totalUsage, { depth: null });
      },
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
};
