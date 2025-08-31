"use server";

import { and, eq, gt, lt, ne, sql } from "drizzle-orm";
import db from "@/db/drizzle";
import { rateLimit } from "@/db/schema";
import { CONSTANTS } from "@/lib/constant";

export const createRateLimit = async (userId: string, inputId: string) => {
  const [res] = await db
    .insert(rateLimit)
    .values({
      userId,
      lastInputId: inputId,
      resetTime: new Date(Date.now() + CONSTANTS.RESET_TIME),
    })
    .onConflictDoNothing()
    .returning();
  if (!res) {
    const [existing] = await db
      .select()
      .from(rateLimit)
      .where(eq(rateLimit.userId, userId));
    return existing;
  }

  return res;
};

export const getRateLimit = async (userId: string) => {
  const [res] = await db
    .select()
    .from(rateLimit)
    .where(eq(rateLimit.userId, userId))
    .limit(1);
  return res;
};

export const updateRateLimit = async (inputId: string, userId: string) => {
  const [res] = await db
    .update(rateLimit)
    .set({
      lastInputId: inputId,
      messageCount: sql`${rateLimit.messageCount} + 1`,
    })
    .where(
      and(
        eq(rateLimit.userId, userId),
        ne(rateLimit.lastInputId, inputId),
        lt(rateLimit.messageCount, CONSTANTS.FREE_MESSAGE_LIMIT),
        gt(rateLimit.resetTime, new Date()),
      ),
    )
    .returning();
  return res;
};

export const resetRateLimit = async (userId: string, inputId: string) => {
  const [res] = await db
    .update(rateLimit)
    .set({
      messageCount: 1,
      lastInputId: inputId,
      resetTime: new Date(Date.now() + CONSTANTS.RESET_TIME),
    })
    .where(
      and(eq(rateLimit.userId, userId), lt(rateLimit.resetTime, new Date())),
    )
    .returning();
  return res;
};
