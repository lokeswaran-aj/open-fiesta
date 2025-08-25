import { aimlapi } from "@ai-ml.api/aimlapi-vercel-ai";

import { extractReasoningMiddleware, wrapLanguageModel } from "ai";

export const getModel = (modelId: string) =>
  wrapLanguageModel({
    model: aimlapi(modelId),
    middleware: extractReasoningMiddleware({ tagName: "think" }),
  });
