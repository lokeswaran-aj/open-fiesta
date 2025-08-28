"use server";

import db from "@/db/drizzle";
import { conversation } from "@/db/schema";

export const createConversation = async (
  conversations: { id: string; chatId: string; modelId: string }[],
) => {
  await db.insert(conversation).values(conversations);
};
