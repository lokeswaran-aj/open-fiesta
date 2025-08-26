import { useMemo, useState } from "react";
import { ProvidersOrder } from "@/lib/models";
import type { Model } from "@/lib/types";

export const useModelSearch = (models: Model[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredModels = useMemo(() => {
    if (!searchQuery.trim()) return models;

    const query = searchQuery.toLowerCase();
    return models.filter((model) => {
      const provider = model.provider.toLowerCase();
      const modelName = model.name.toLowerCase();

      const fullId = model.id;

      return (
        modelName.includes(query) ||
        provider.includes(query) ||
        fullId.includes(query)
      );
    });
  }, [models, searchQuery]);

  const groupedByGatewayAndProvider = filteredModels.reduce<
    Record<string, Record<string, Model[]>>
  >((acc, model) => {
    const gateway = model.gateway;
    const provider = model.provider;

    if (!acc[gateway]) {
      acc[gateway] = {};
    }

    if (!acc[gateway][provider]) {
      acc[gateway][provider] = [];
    }

    acc[gateway][provider].push(model);
    return acc;
  }, {});

  const groupedByGateway = groupedByGatewayAndProvider;

  const sortGateways = (
    [gatewayA]: [string, Record<string, Model[]>],
    [gatewayB]: [string, Record<string, Model[]>],
  ) => {
    const gatewayOrder = ["openrouter", "vercel", "aimlapi"];
    const gatewayIndexA = gatewayOrder.indexOf(gatewayA);
    const gatewayIndexB = gatewayOrder.indexOf(gatewayB);

    return gatewayIndexA - gatewayIndexB;
  };

  const sortProviders = (
    [providerA]: [string, Model[]],
    [providerB]: [string, Model[]],
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

  const sortedProviders = Object.entries(groupedByGateway)
    .sort(sortGateways)
    .map(([gateway, providers]) => ({
      [gateway]: Object.entries(providers)
        .sort(sortProviders)
        .map(([provider, models]) => [
          provider,
          models.sort((a, b) => {
            if (a.isFree !== b.isFree) {
              return a.isFree ? -1 : 1;
            }
            return a.name.localeCompare(b.name);
          }),
        ]),
    }));

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const totalResults = filteredModels.length;
  const hasResults = totalResults > 0;
  const isSearching = searchQuery.trim().length > 0;

  return {
    searchQuery,
    setSearchQuery,
    handleClearSearch,
    filteredModels,
    sortedProviders,
    totalResults,
    hasResults,
    isSearching,
  };
};
