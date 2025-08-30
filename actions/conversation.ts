"use server";

import { and, eq, sql } from "drizzle-orm";
import db from "@/db/drizzle";
import { conversation } from "@/db/schema";
import type { Model } from "@/lib/types";

export const createConversation = async (
  conversations: { id: string; chatId: string; model: Model }[],
) => {
  await db.insert(conversation).values(conversations);
};

export const updateConversationStatus = async (
  chatId: string,
  model: Model,
  status: boolean,
) => {
  const existingConversation = await db
    .select()
    .from(conversation)
    .where(
      and(
        eq(conversation.chatId, chatId),
        sql`${conversation.model}->>'id' = ${model.id}`,
      ),
    )
    .limit(1);

  if (existingConversation.length > 0) {
    await db
      .update(conversation)
      .set({ active: status, updatedAt: new Date() })
      .where(
        and(
          eq(conversation.chatId, chatId),
          sql`${conversation.model}->>'id' = ${model.id}`,
        ),
      );
  } else if (status) {
    await db.insert(conversation).values({
      chatId,
      model,
    });
  }
};
