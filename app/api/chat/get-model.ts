import { aimlapi } from "@ai-ml.api/aimlapi-vercel-ai";
import { gateway as aiGateway } from "@ai-sdk/gateway";
import { type LanguageModelV2, openrouter } from "@openrouter/ai-sdk-provider";
import { extractReasoningMiddleware, wrapLanguageModel } from "ai";

export const getModel = (modelId: string, gateway: string) => {
  console.log(gateway, modelId);
  let model: LanguageModelV2;
  if (gateway === "openrouter") {
    model = openrouter.chat(modelId);
  } else if (gateway === "vercel") {
    model = aiGateway(modelId);
  } else {
    model = aimlapi(modelId);
  }
  return wrapLanguageModel({
    model,
    middleware: extractReasoningMiddleware({ tagName: "think" }),
  });
};
