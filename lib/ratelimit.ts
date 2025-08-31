import {
  createRateLimit,
  getRateLimit,
  resetRateLimit,
  updateRateLimit,
} from "@/actions/ratelimit";
import { CONSTANTS } from "@/lib/constant";

export const handleRateLimit = async (userId: string, inputId: string) => {
  const resetResult = await resetRateLimit(userId, inputId);
  if (resetResult) {
    console.log("reset result");
    return {
      allowed: true,
      messageCount: resetResult.messageCount,
    };
  }
  const updateResult = await updateRateLimit(inputId, userId);
  if (updateResult) {
    console.log("update result");
    return {
      allowed: true,
      messageCount: updateResult.messageCount,
    };
  }

  const existingRateLimit = await getRateLimit(userId);

  if (existingRateLimit) {
    if (existingRateLimit.lastInputId === inputId) {
      console.log("existing rate limit allowed (same input)");
      return {
        allowed: true,
        messageCount: existingRateLimit.messageCount,
      };
    }
    if (existingRateLimit.messageCount >= CONSTANTS.FREE_MESSAGE_LIMIT) {
      console.log("existing rate limit exceeded");
      return {
        allowed: false,
        messageCount: existingRateLimit.messageCount,
      };
    }
    console.log("existing rate limit allowed");
    return {
      allowed: true,
      messageCount: existingRateLimit.messageCount,
    };
  }

  const createResult = await createRateLimit(userId, inputId);
  console.log("create result");
  return {
    allowed: true,
    messageCount: createResult.messageCount,
  };
};
