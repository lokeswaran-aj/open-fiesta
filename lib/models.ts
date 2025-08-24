import type { GatewayLanguageModelEntry } from "@ai-sdk/gateway";

export function sortModelsByProvider(
  models: GatewayLanguageModelEntry[],
): GatewayLanguageModelEntry[] {
  return [...models].sort((a, b) => {
    const providerA = a.specification.provider.toLowerCase();
    const providerB = b.specification.provider.toLowerCase();
    return providerA.localeCompare(providerB);
  });
}

export const ProvidersOrder = [
  "Openai",
  "Anthropic",
  "Google",
  "Deepseek",
  "Xai",
  "Meta",
  "Moonshotai",
  "Perplexity",
  "Alibaba",
  "Amazon",
  "Cohere",
  "Mistral",
  "Vercel",
  "Zai",
  "Inception",
  "Morph",
];
export const models: GatewayLanguageModelEntry[] = [
  {
    id: "openai/gpt-4o-mini",
    name: "GPT-4o mini",
    description:
      "GPT-4o mini from OpenAI is their most advanced and cost-efficient small model. It is multi-modal (accepting text or image inputs and outputting text) and has higher intelligence than gpt-3.5-turbo but is just as fast.",
    pricing: {
      input: "0.00000015",
      output: "0.0000006",
    },
    specification: {
      specificationVersion: "v2",
      provider: "azure",
      modelId: "openai/gpt-4o-mini",
    },
    modelType: "language",
  },
  {
    id: "google/gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    description:
      "Gemini 2.5 Flash is a thinking model that offers great, well-rounded capabilities. It is designed to offer a balance between price and performance with multimodal support and a 1M token context window.",
    pricing: {
      input: "0.0000003",
      output: "0.0000025",
    },
    specification: {
      specificationVersion: "v2",
      provider: "vertex",
      modelId: "google/gemini-2.5-flash",
    },
    modelType: "language",
  },
  {
    id: "deepseek/deepseek-v3.1-thinking",
    name: "DeepSeek V3.1 Thinking",
    description:
      "DeepSeek-V3.1 marks DeepSeek's first step toward the agent era with revolutionary hybrid inference capabilities. Operates in two modes: Think and Non-Think. The Think variant delivers faster reasoning compared to DeepSeek-R1-0528, reaching answers more efficiently while maintaining high-quality outputs. Enhanced through specialized post-training, the model excels at tool usage and complex multi-step agent tasks.",
    pricing: {
      input: "0.00000056",
      output: "0.00000168",
    },
    specification: {
      specificationVersion: "v2",
      provider: "deepseek",
      modelId: "deepseek/deepseek-v3.1-thinking",
    },
    modelType: "language",
  },
  {
    id: "xai/grok-3-mini",
    name: "Grok 3 Mini Beta",
    description:
      "xAI's lightweight model that thinks before responding. Great for simple or logic-based tasks that do not require deep domain knowledge. The raw thinking traces are accessible.",
    pricing: {
      input: "0.0000003",
      output: "0.0000005",
    },
    specification: {
      specificationVersion: "v2",
      provider: "xai",
      modelId: "xai/grok-3-mini",
    },
    modelType: "language",
  },
  {
    id: "anthropic/claude-3.5-haiku",
    name: "Claude 3.5 Haiku",
    description:
      "Claude 3.5 Haiku is the next generation of our fastest model. For a similar speed to Claude 3 Haiku, Claude 3.5 Haiku improves across every skill set and surpasses Claude 3 Opus, the largest model in our previous generation, on many intelligence benchmarks.",
    pricing: {
      input: "0.0000008",
      output: "0.000004",
    },
    specification: {
      specificationVersion: "v2",
      provider: "anthropic",
      modelId: "anthropic/claude-3.5-haiku",
    },
    modelType: "language",
  },
];

export const AI_MODELS = sortModelsByProvider(models);
