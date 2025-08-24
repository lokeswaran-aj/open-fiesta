import type { JSONValue } from "ai";

export const getProviderOptions = (
  model: string,
): Record<string, Record<string, JSONValue>> => {
  return {
    anthropic: {
      thinking: { type: "enabled", budgetTokens: 1024 },
    },
    xai:
      model === "xai/grok-3-mini" || model === "xai/grok-3-mini-fast"
        ? { reasoningEffort: "high" }
        : {},
    openai: {
      reasoningEffort: "low",
    },
  };
};
