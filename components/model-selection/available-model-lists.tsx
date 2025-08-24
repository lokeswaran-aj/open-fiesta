"use client";
import type { GatewayLanguageModelEntry } from "@ai-sdk/gateway";
import { useEffect } from "react";
import { toast } from "sonner";
import { ProvidersOrder } from "@/lib/models";
import { useModels } from "@/stores/use-models";
import { ModelCard } from "./model-card";

export const AvailableModelsList = () => {
  const { models, setModels } = useModels((state) => state);

  useEffect(() => {
    const fetchModels = async () => {
      const res = await fetch("/api/models");
      const data = await res.json();
      if (res.ok) {
        setModels(data.models);
      } else {
        toast.error(data.error);
      }
    };
    fetchModels();
  }, [setModels]);

  // Group models by provider
  const groupedModels = models.reduce(
    (acc, model) => {
      const provider = model.id.split("/")[0];
      const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);
      if (!acc[providerName]) {
        acc[providerName] = [];
      }
      acc[providerName].push(model);
      return acc;
    },
    {} as Record<string, GatewayLanguageModelEntry[]>,
  );

  // Sort providers by their position in the ProvidersOrder array
  const sortProviders = (
    [providerA]: [string, GatewayLanguageModelEntry[]],
    [providerB]: [string, GatewayLanguageModelEntry[]],
  ) => {
    const indexA = ProvidersOrder.indexOf(providerA);
    const indexB = ProvidersOrder.indexOf(providerB);
    if (indexA !== -1 && indexB !== -1) {
      return indexA - indexB;
    }
    if (indexA !== -1 && indexB === -1) {
      return -1;
    }
    if (indexA === -1 && indexB !== -1) {
      return 1;
    }
    return providerA.localeCompare(providerB);
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <h2 className="text-lg font-semibold">Available Models</h2>
      <div className="space-y-6">
        {Object.entries(groupedModels)
          .sort(sortProviders)
          .map(([provider, models]) => (
            <div key={provider} className="space-y-3">
              <h3 className="text-md font-semibold">{provider}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {models.map((model) => (
                  <ModelCard key={model.id} model={model} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
