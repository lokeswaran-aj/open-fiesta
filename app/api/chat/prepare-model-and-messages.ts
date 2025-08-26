import { createAIMLAPI } from "@ai-ml.api/aimlapi-vercel-ai";
import { createGateway } from "@ai-sdk/gateway";
import {
  createOpenRouter,
  type LanguageModelV2,
} from "@openrouter/ai-sdk-provider";
import {
  extractReasoningMiddleware,
  type ModelMessage,
  wrapLanguageModel,
} from "ai";
import { siteConfig } from "@/lib/config";
import type { Gateway } from "@/lib/types";

const GATEWAY_API_KEYS = {
  openrouter: process.env.OPENROUTER_API_KEY,
  vercel: process.env.AI_GATEWAY_API_KEY,
  aimlapi: process.env.AIMLAPI_API_KEY,
} as const;

export const prepareModelAndMessages = (
  modelId: string,
  gateway: Gateway,
  modelMessages: ModelMessage[],
  userApiKey?: string,
) => {
  const apiKey = userApiKey || GATEWAY_API_KEYS[gateway];
  let modelWithApiKey: LanguageModelV2;
  let system: string | undefined = siteConfig.systemPrompt;
  let messages = modelMessages;
  if (gateway === "openrouter") {
    const customOpenRouter = createOpenRouter({ apiKey });
    modelWithApiKey = customOpenRouter.chat(modelId);
  } else if (gateway === "vercel") {
    const customAiGateway = createGateway({ apiKey });
    modelWithApiKey = customAiGateway(modelId);
  } else {
    const customAIMLAPI = createAIMLAPI({ apiKey });
    modelWithApiKey = customAIMLAPI(modelId);
    messages = [
      {
        role: "assistant",
        content: siteConfig.systemPrompt,
      },
      ...modelMessages,
    ];
    system = undefined;
  }
  return {
    model: wrapLanguageModel({
      model: modelWithApiKey,
      middleware: extractReasoningMiddleware({ tagName: "think" }),
    }),
    messages,
    system,
  };
};
