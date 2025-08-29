"use server";

import db from "@/db/drizzle";
import { conversation } from "@/db/schema";
import type { Model } from "@/lib/types";

export const createConversation = async (
  conversations: { id: string; chatId: string; model: Model }[],
) => {
  await db.insert(conversation).values(conversations);
};
