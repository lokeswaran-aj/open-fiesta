import type { GatewayLanguageModelEntry } from "@ai-sdk/gateway";
import { ModelLogo } from "./model-logo";

type Props = {
  model: GatewayLanguageModelEntry;
};

export const ModelCard = ({ model }: Props) => {
  const formatPrice = (price: string) => {
    const priceNum = parseFloat(price);
    const pricePerMillion = (priceNum * 1000000).toFixed(2);
    return `$${pricePerMillion} / million tokens`;
  };
  return (
    <div
      key={model.id}
      className="w-full border rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="px-4 py-3 text-sm bg-card rounded-t-lg border-b">
        <div className="flex items-center">
          <ModelLogo modelId={model.id} />
          <div className="space-x-1 truncate">
            <span className="font-medium text-foreground truncate">
              {model.name}
            </span>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 text-xs bg-card rounded-b-lg">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="font-medium text-foreground">ID</div>
            <div className="text-muted-foreground text-right">{model.id}</div>
          </div>
          <div className="flex items-start justify-between">
            <div className="font-medium text-foreground">Input Pricing</div>
            <div className="text-muted-foreground text-right">
              {model.pricing ? formatPrice(model.pricing.input) : "-"}
            </div>
          </div>
          <div className="flex items-start justify-between">
            <div className="font-medium text-foreground">Output Pricing</div>
            <div className="text-muted-foreground text-right">
              {model.pricing ? formatPrice(model.pricing.output) : "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
