"use server";

import { and, desc, eq } from "drizzle-orm";
import db from "@/db/drizzle";
import {
  type ChatType,
  type ConversationType,
  chat,
  conversation,
  type MessageType,
  message,
} from "@/db/schema";

export const createChat = async (id: string, userId: string) => {
  const res = await db.insert(chat).values({ id, userId }).returning();
  return res[0];
};

export const getChat = async (id: string) => {
  const res = await db.select().from(chat).where(eq(chat.id, id)).limit(1);
  return res[0];
};

export const getChatsByUserId = async (
  userId: string,
  limit: number = 20,
  offset: number = 0,
) => {
  const res = await db
    .select({ id: chat.id, title: chat.title })
    .from(chat)
    .where(eq(chat.userId, userId))
    .orderBy(desc(chat.createdAt))
    .limit(limit)
    .offset(offset);
  return res;
};

export const getChatWithConversationsWithMessages = async (id: string) => {
  const rows = await db
    .select({
      chat,
      conversation,
      message,
    })
    .from(chat)
    .innerJoin(conversation, eq(chat.id, conversation.chatId))
    .leftJoin(message, eq(conversation.id, message.conversationId))
    .where(and(eq(chat.id, id), eq(conversation.active, true)))
    .orderBy(conversation.createdAt, message.createdAt);

  if (rows.length === 0) return null;

  const chatInfo = rows[0].chat;

  const grouped = new Map<
    string,
    {
      conversation: typeof conversation.$inferSelect;
      messages: (typeof message.$inferSelect)[];
    }
  >();

  for (const row of rows) {
    const convId = row.conversation.id;

    if (!grouped.has(convId)) {
      grouped.set(convId, {
        conversation: row.conversation,
        messages: [],
      });
    }

    if (row.message) {
      const conversationGroup = grouped.get(convId);
      if (conversationGroup) {
        conversationGroup.messages.push(row.message);
      }
    }
  }

  return {
    chat: chatInfo,
    conversations: Array.from(grouped.values()),
  };
};

export const updateChatTitle = async (
  id: string,
  userId: string,
  title: string,
) => {
  await db
    .update(chat)
    .set({ title })
    .where(and(eq(chat.id, id), eq(chat.userId, userId)));
};

export type ConversationsWithMessages = {
  conversation: ConversationType;
  messages: MessageType[];
};

export type ChatWithConversationsWithMessages = {
  chat: ChatType;
  conversations: ConversationsWithMessages[];
};
