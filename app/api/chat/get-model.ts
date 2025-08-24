import { gateway } from "@ai-sdk/gateway";
import { extractReasoningMiddleware, wrapLanguageModel } from "ai";

export const getModel = (modelId: string) =>
  wrapLanguageModel({
    model: gateway(modelId),
    middleware: extractReasoningMiddleware({ tagName: "think" }),
  });
