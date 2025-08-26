import { SearchInput } from "./search-input";
import { SearchResultsInfo } from "./search-results-info";

export const AvailableModelHeader = ({
  searchQuery,
  setSearchQuery,
  handleClearSearch,
  totalResults,
  hasResults,
  isSearching,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleClearSearch: () => void;
  totalResults: number;
  hasResults: boolean;
  isSearching: boolean;
}) => (
  <div className="flex-shrink-0 space-y-4 pb-4">
    <h2 className="text-lg font-semibold">
      {`Available Models (${totalResults})`}
    </h2>

    <SearchInput
      value={searchQuery}
      onChange={setSearchQuery}
      onClear={handleClearSearch}
      placeholder="Search models by name or provider..."
    />

    {!isSearching && (
      <SearchResultsInfo
        searchQuery={searchQuery}
        totalResults={totalResults}
        hasResults={hasResults}
      />
    )}
  </div>
);
