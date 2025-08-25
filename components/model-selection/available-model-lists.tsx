"use client";
import { useEffect } from "react";
import { toast } from "sonner";
import { useModelSearch } from "@/hooks/useModelSearch";
import { useModels } from "@/stores/use-models";
import { EmptyState } from "./empty-state";
import { ModelListSkeleton } from "./model-list-skeleton";
import { ProviderSection } from "./provider-section";
import { SearchInput } from "./search-input";
import { SearchResultsInfo } from "./search-results-info";

export const AvailableModelsList = () => {
  const { models, setModels, isLoading, setLoading } = useModels(
    (state) => state,
  );

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
    const fetchModels = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/models?provider=aiml");
        const data = await res.json();
        if (res.ok) {
          setModels(data.models);
        } else {
          toast.error(data.error);
        }
      } catch {
        toast.error("Failed to fetch models");
      } finally {
        setLoading(false);
      }
    };
    fetchModels();
  }, [setModels, setLoading]);

  if (isLoading) {
    return (
      <div className="flex flex-col flex-1 min-h-0">
        <div className="flex-shrink-0 space-y-4 pb-4">
          <h2 className="text-lg font-semibold">Available Models</h2>
          <SearchInput
            value=""
            onChange={() => {}}
            onClear={() => {}}
            placeholder="Search models by name or provider..."
          />
        </div>
        <div className="flex-1 overflow-y-auto min-h-0">
          <ModelListSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Header Section - Fixed */}
      <div className="flex-shrink-0 space-y-4 pb-4">
        <h2 className="text-lg font-semibold">Available Models</h2>

        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={handleClearSearch}
          placeholder="Search models by name or provider..."
        />

        <SearchResultsInfo
          searchQuery={searchQuery}
          totalResults={totalResults}
          hasResults={hasResults}
        />
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {hasResults ? (
          <div className="space-y-6 pr-2">
            {sortedProviders.map(([providerName, models]) => (
              <ProviderSection
                key={providerName}
                providerName={providerName}
                models={models}
              />
            ))}
          </div>
        ) : isSearching ? (
          <EmptyState onClearSearch={handleClearSearch} />
        ) : null}
      </div>
    </div>
  );
};
