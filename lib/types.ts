export interface Model {
  id: string;
  name: string;
  provider: string;
  pricing?: {
    input: number;
    output: number;
  };
  context: string;
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
