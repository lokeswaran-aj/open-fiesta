"use server";

import type { UIMessage } from "ai";
import db from "@/db/drizzle";
import { message } from "@/db/schema";

export const saveMessage = async (
  conversationId: string,
  role: "user" | "assistant",
  parts: UIMessage["parts"],
) => {
  await db.insert(message).values({
    conversationId,
    role: role as "user" | "assistant",
    parts: parts,
  });
};
