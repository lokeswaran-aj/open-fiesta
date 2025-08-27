import db from "./drizzle";
import { chat } from "./schema";

export const createChat = async (id: string, userId: string) => {
  const res = await db
    .insert(chat)
    .values({ id, userId, visibility: "private" })
    .returning();
  return res;
};
