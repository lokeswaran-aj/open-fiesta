import { SidebarMenuItem } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export const ChatHistorySkeleton = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, idx) => (
        <SidebarMenuItem key={idx}>
          <Skeleton className="h-8 w-full rounded-xl mt-2" />
        </SidebarMenuItem>
      ))}
    </>
  );
};
