import {
  Anthropic,
  Aws,
  Cohere,
  DeepSeek,
  Google,
  Meta,
  Mistral,
  Moonshot,
  OpenAI,
  Perplexity,
  Qwen,
  Vercel,
  XAI,
  ZAI,
} from "@lobehub/icons";

const ProviderLogos = {
  openai: (size: number) => <OpenAI size={size} />,
  alibaba: (size: number) => <Qwen.Color size={size} />,
  amazon: (size: number) => <Aws.Color size={size} />,
  anthropic: (size: number) => <Anthropic size={size} />,
  azure: (size: number) => <OpenAI size={size} />,
  cohere: (size: number) => <Cohere.Color size={size} />,
  deepseek: (size: number) => <DeepSeek.Color size={size} />,
  google: (size: number) => <Google.Color size={size} />,
  meta: (size: number) => <Meta.Color size={size} />,
  mistral: (size: number) => <Mistral.Color size={size} />,
  moonshotai: (size: number) => <Moonshot size={size} />,
  perplexity: (size: number) => <Perplexity.Color size={size} />,
  vercel: (size: number) => <Vercel size={size} />,
  xai: (size: number) => <XAI size={size} />,
  zai: (size: number) => <ZAI size={size} />,
};

export default ProviderLogos;
