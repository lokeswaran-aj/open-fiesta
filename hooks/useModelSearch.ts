import type { GatewayLanguageModelEntry } from "@ai-sdk/gateway";
import { useMemo, useState } from "react";
import { ProvidersOrder } from "@/lib/models";

export const useModelSearch = (models: GatewayLanguageModelEntry[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter models based on search query
  const filteredModels = useMemo(() => {
    if (!searchQuery.trim()) return models;

    const query = searchQuery.toLowerCase();
    return models.filter((model) => {
      const provider = model.id.split("/")[0];
      const modelName = model.name?.toLowerCase() || "";
      const providerId = provider.toLowerCase();
      const fullId = model.id.toLowerCase();

      return (
        modelName.includes(query) ||
        providerId.includes(query) ||
        fullId.includes(query)
      );
    });
  }, [models, searchQuery]);

  // Group filtered models by provider
  const groupedModels = filteredModels.reduce(
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

  const sortedProviders = Object.entries(groupedModels).sort(sortProviders);

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
