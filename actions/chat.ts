"use server";

import db from "@/db/drizzle";
import { chat } from "@/db/schema";

export const createChat = async (id: string, userId: string) => {
  const res = await db.insert(chat).values({ id, userId }).returning();
  return res[0];
};
