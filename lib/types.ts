export interface Model {
  id: string;
  name: string;
  provider: string;
  pricing: {
    input: string;
    output: string;
  };
  context?: string;
  gateway: "openrouter" | "aimlapi" | "vercel";
}

export interface AIMLModel {
  id: string;
  type: string;
  info: Info;
  features: string[];
}

export interface Info {
  name: string;
  developer: string;
  description: string;
  contextLength: number;
  maxTokens: number;
  url: string;
}

export interface OpenRouterModel {
  id: string;
  canonical_slug: string;
  hugging_face_id: string;
  name: string;
  created: number;
  description: string;
  context_length: number;
  architecture: Architecture;
  pricing: Pricing;
  top_provider: TopProvider;
  supported_parameters: string[];
}

export interface Architecture {
  modality: string;
  input_modalities: string[];
  output_modalities: string[];
  tokenizer: string;
  instruct_type: string;
}

export interface Pricing {
  prompt: string;
  completion: string;
  request: string;
  image: string;
  web_search: string;
  internal_reasoning: string;
}

export interface TopProvider {
  context_length: number;
  max_completion_tokens: number | null;
  is_moderated: boolean;
}
