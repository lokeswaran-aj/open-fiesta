import type { Model } from "@/lib/types";
import { ModelCard } from "./model-card";

type ProviderSectionProps = {
  providerName: string;
  models: Model[];
};

export const ProviderSection = ({
  providerName,
  models,
}: ProviderSectionProps) => {
  return (
    <div className="space-y-3">
      <h3 className="text-md font-semibold">
        {providerName} ({models.length})
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {models.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
      <hr />
    </div>
  );
};
