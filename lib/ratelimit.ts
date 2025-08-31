import {
  createRateLimit,
  getRateLimit,
  resetRateLimit,
  updateRateLimit,
} from "@/actions/ratelimit";
import { CONSTANTS } from "./constant";

export const handleRateLimit = async (userId: string, inputId: string) => {
  const resetResult = await resetRateLimit(userId, inputId);
  if (resetResult) {
    return {
      allowed: true,
      messageCount: resetResult.messageCount,
      resetTime: resetResult.resetTime,
    };
  }
  const updateResult = await updateRateLimit(inputId, userId);
  if (updateResult) {
    return {
      allowed: true,
      messageCount: updateResult.messageCount,
      resetTime: updateResult.resetTime,
    };
  }

  const existingRateLimit = await getRateLimit(userId);

  if (existingRateLimit) {
    if (existingRateLimit.lastInputId === inputId) {
      return {
        allowed: true,
        messageCount: existingRateLimit.messageCount,
        resetTime: existingRateLimit.resetTime,
      };
    }
    if (existingRateLimit.messageCount >= CONSTANTS.FREE_MESSAGE_LIMIT) {
      return {
        allowed: false,
        messageCount: existingRateLimit.messageCount,
        resetTime: existingRateLimit.resetTime,
      };
    }
    return {
      allowed: true,
      messageCount: existingRateLimit.messageCount,
      resetTime: existingRateLimit.resetTime,
    };
  }

  const createResult = await createRateLimit(userId, inputId);
  return {
    allowed: true,
    messageCount: createResult.messageCount,
    resetTime: createResult.resetTime,
  };
};
