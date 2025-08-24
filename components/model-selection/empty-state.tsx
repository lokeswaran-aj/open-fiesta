import { Search } from "lucide-react";

type EmptyStateProps = {
  onClearSearch: () => void;
};

export const EmptyState = ({ onClearSearch }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center h-full">
      <Search className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">No models found</h3>
      <p className="text-muted-foreground mb-4">
        Try adjusting your search terms or{" "}
        <button
          type="button"
          onClick={onClearSearch}
          className="text-primary hover:underline"
        >
          clear the search
        </button>{" "}
        to see all models.
      </p>
    </div>
  );
};
