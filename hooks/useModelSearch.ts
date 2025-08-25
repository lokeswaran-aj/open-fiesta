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

  const groupedModels = filteredModels.reduce(
    (acc, model) => {
      const providerName = model.provider;
      if (!acc[providerName]) {
        acc[providerName] = [];
      }
      acc[providerName].push(model);
      return acc;
    },
    {} as Record<string, Model[]>,
  );

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
