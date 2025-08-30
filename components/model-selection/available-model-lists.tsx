"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchModels } from "@/actions/fetch-models";
import { useModelSearch } from "@/hooks/use-model-search";
import { useModels } from "@/stores/use-models";
import { AvailableModelHeader } from "./available-model-header";
import { EmptyState } from "./empty-state";
import { LoadingModelHeader } from "./loading-model-header";
import { ModelListSkeleton } from "./model-list-skeleton";
import { ModelsTab } from "./models-tab";

export const AvailableModelsList = () => {
  const models = useModels((state) => state.models);
  const setModels = useModels((state) => state.setModels);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {
    searchQuery,
    setSearchQuery,
    handleClearSearch,
    sortedProviders,
    totalResults,
    hasResults,
    isSearching,
  } = useModelSearch(models);

  useEffect(() => {
    const loadModels = async () => {
      setIsLoading(true);
      setError(null);

      const { models: fetchedModels, error: fetchError } = await fetchModels();

      if (fetchError) {
        setError(fetchError);
        toast.error(fetchError);
      } else {
        setModels(fetchedModels);
      }

      setIsLoading(false);
    };

    loadModels();
  }, [setModels]);

  const renderContent = () => {
    if (isLoading) {
      return <ModelListSkeleton />;
    }

    if (models.length === 0 && error) {
      return (
        <div className="flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>Failed to load models. Please try again later.</p>
          </div>
        </div>
      );
    }

    if (hasResults) {
      return <ModelsTab sortedProviders={sortedProviders} />;
    }

    if (isSearching) {
      return <EmptyState onClearSearch={handleClearSearch} />;
    }

    return null;
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {isLoading || (models.length === 0 && error) ? (
        <LoadingModelHeader />
      ) : (
        <AvailableModelHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleClearSearch={handleClearSearch}
          totalResults={totalResults}
          hasResults={hasResults}
          isSearching={isSearching}
        />
      )}

      <div className="flex-1 overflow-y-auto min-h-0">{renderContent()}</div>
    </div>
  );
};
