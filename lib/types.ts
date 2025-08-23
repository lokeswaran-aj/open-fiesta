export interface GatewayModel {
  id: string;
  name: string;
  description: string;
  pricing: Pricing;
  specification: Specification;
  modelType: string;
}

export interface Pricing {
  input: string;
  output: string;
}

export interface Specification {
  specificationVersion: string;
  provider: string;
  modelId: string;
}

export interface Model {
  id: string;
  name: string;
  pricing: Pricing;
  provider: string;
}
