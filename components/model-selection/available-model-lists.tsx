"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { fetchModels } from "@/actions/fetch-models";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useModelSearch } from "@/hooks/use-model-search";
import type { Model } from "@/lib/types";
import { EmptyState } from "./empty-state";
import { ModelListSkeleton } from "./model-list-skeleton";
import { ProviderSection } from "./provider-section";
import { SearchInput } from "./search-input";
import { SearchResultsInfo } from "./search-results-info";

export const AvailableModelsList = () => {
  const [models, setModels] = useState<Model[]>([]);
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
  }, []);

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

  if (models.length === 0 && error) {
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
        <div className="flex-1 overflow-y-auto min-h-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>Failed to load models. Please try again later.</p>
          </div>
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
          <Tabs defaultValue="vercel" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="openrouter">OpenRouter</TabsTrigger>
              <TabsTrigger value="vercel">Vercel</TabsTrigger>
              <TabsTrigger value="aimlapi">AIML API</TabsTrigger>
            </TabsList>

            {sortedProviders.map((gatewayObj) => {
              const gateway = Object.keys(gatewayObj)[0];
              const providers = gatewayObj[gateway] as [string, Model[]][];
              return (
                <TabsContent
                  key={gateway}
                  value={gateway}
                  className="flex-1 mt-4"
                >
                  <div className="space-y-6 pr-2">
                    {providers.map(([providerName, models]) => (
                      <ProviderSection
                        key={providerName}
                        providerName={providerName}
                        models={models}
                      />
                    ))}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        ) : isSearching ? (
          <EmptyState onClearSearch={handleClearSearch} />
        ) : null}
      </div>
    </div>
  );
};
