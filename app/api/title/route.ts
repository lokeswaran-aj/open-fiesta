import { openai } from "@ai-sdk/openai";
import type { LanguageModelV2 } from "@openrouter/ai-sdk-provider";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { updateChatTitle } from "@/actions/chat";
import { titleSchema } from "@/lib/types";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { context, chatId } = await req.json();

  const userMessage = context.slice(0, 500);

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

  await updateChatTitle(chatId, result.object.title);

  return NextResponse.json(result.object);
}
