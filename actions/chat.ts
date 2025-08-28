"use server";

import { eq } from "drizzle-orm";
import db from "@/db/drizzle";
import { chat } from "@/db/schema";

export const createChat = async (id: string, userId: string) => {
  const res = await db.insert(chat).values({ id, userId }).returning();
  return res[0];
};

export const getChat = async (id: string) => {
  const res = await db.select().from(chat).where(eq(chat.id, id)).limit(1);
  return res[0];
};
