import { SearchInput } from "./search-input";

export const LoadingModelHeader = () => (
  <div className="flex-shrink-0 space-y-4 pb-4">
    <h2 className="text-lg font-semibold">Available Models</h2>
    <SearchInput
      value=""
      onChange={() => {}}
      onClear={() => {}}
      placeholder="Search models by name or provider..."
    />
  </div>
);
