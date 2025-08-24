import { Skeleton } from "@/components/ui/skeleton";

export const ModelListSkeleton = () => {
  return (
    <div className="space-y-6 pr-2">
      {/* Loading skeleton for providers */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-3">
          {/* Provider title skeleton */}
          <Skeleton className="h-6 w-32" />
          {/* Model cards skeletons in grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="w-full border rounded-lg shadow-sm">
                {/* Header section */}
                <div className="flex items-center justify-between px-4 py-3 text-sm bg-card rounded-t-lg border-b gap-2">
                  <div className="flex items-center min-w-0 flex-1">
                    <Skeleton className="size-5 rounded-full flex-shrink-0" />
                    <div className="min-w-0 flex-1 ml-2">
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                  <Skeleton className="size-8 rounded-full flex-shrink-0" />
                </div>
                {/* Details section */}
                <div className="px-4 py-3 text-xs bg-card rounded-b-lg">
                  <div className="space-y-3">
                    {/* ID row */}
                    <div className="flex items-start justify-between">
                      <Skeleton className="h-3 w-6" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                    {/* Input Pricing row */}
                    <div className="flex items-start justify-between">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                    {/* Output Pricing row */}
                    <div className="flex items-start justify-between">
                      <Skeleton className="h-3 w-18" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};
