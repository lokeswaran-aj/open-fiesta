import { openai } from "@ai-sdk/openai";
import type { LanguageModelV2 } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { deleteChat, getChatsByUserId, updateChatTitle } from "@/actions/chat";
import { auth } from "@/lib/auth";
import { titleSchema } from "@/lib/types";

export const maxDuration = 30;

export const GET = async (req: Request) => {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  const userId = session?.user?.id;

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const offset = Number(searchParams.get("offset"));
  const limit = Number(searchParams.get("limit"));

  const chats = await getChatsByUserId(userId, limit, offset);

  return NextResponse.json({ history: chats });
};

export async function POST(req: Request) {
  const { input, chatId } = await req.json();

  const session = await auth.api.getSession({
    headers: req.headers,
  });
  const userId = session?.user?.id;

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userMessage = input.slice(0, 500);

  let model: string | LanguageModelV2 = "openai/gpt-4.1-nano";
  if (process.env.OPENAI_API_KEY) {
    model = openai("gpt-4o-mini");
  }

  const result = await generateObject({
    model,
    schema: titleSchema,
    prompt: `Based on the following first user message, generate a short and clear chat title (max 5 words) that captures the main intent. No punctuation, no quotes, no emojis. Capitalize the first letter.
    <user_message>
    ${userMessage}
    </user_message>`,
  });

  await updateChatTitle(chatId, userId, result.object.title);

  return NextResponse.json(result.object);
}

export async function DELETE(req: Request) {
  try {
    const { chatId } = await req.json();

    const session = await auth.api.getSession({
      headers: req.headers,
    });
    const userId = session?.user?.id;

    if (!userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await deleteChat(chatId, userId);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error(error);
    return new Response("Internal server error", { status: 500 });
  }
}
