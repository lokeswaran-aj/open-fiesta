"use client";

import { MoreHorizontal, Pen, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useHistory } from "@/stores/use-history";
import { Skeleton } from "./ui/skeleton";

const LIMIT = 30;

export const ChatHistory = () => {
  const { isMobile } = useSidebar();
  const router = useRouter();

  const {
    history,
    setHistory,
    addToHistory,
    offset,
    setOffset,
    hasMore,
    setHasMore,
    loading,
    setLoading,
  } = useHistory();

  const observerRef = useRef<IntersectionObserver>(null);

  const lastElement = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset(offset + LIMIT);
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [loading, hasMore, offset, setOffset],
  );

  useEffect(() => {
    setLoading(true);
    const fetchHistory = async () => {
      try {
        const data = await fetch(`/api/title?offset=${offset}&limit=${LIMIT}`);
        const { history: chats } = await data.json();
        if (offset === 0) setHistory(chats);
        else addToHistory(chats);
        setHasMore(chats.length === LIMIT);
      } catch (error) {
        console.error(error);
        setHasMore(false);
        toast.error("Failed to fetch chat history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [offset, setHistory, setHasMore, setLoading, addToHistory]);

  const handleDeleteChat = async (chatId: string) => {
    await fetch(`/api/title`, {
      method: "DELETE",
      body: JSON.stringify({ chatId }),
    });
    setHistory(history.filter((item) => item.id !== chatId));
    toast.success("Chat deleted");
    router.replace("/");
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {history.map((item, index) => (
          <SidebarMenuItem key={`${item.id}-${index}`}>
            <SidebarMenuButton
              asChild
              onClick={() => router.push(`/c/${item.id}`)}
            >
              <div className="min-w-0 flex-1">
                <span className="block truncate text-left">{item.title}</span>
              </div>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <Pen className="text-muted-foreground" />
                  <span>Rename</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDeleteChat(item.id)}>
                  <Trash2 className="text-destructive" />
                  <span className="text-destructive">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        {hasMore ? (
          <div ref={lastElement}>{loading && <ChatHistorySkeleton />}</div>
        ) : (
          <div className="truncate text-center text-sm text-muted-foreground">
            No more chat history
          </div>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
};

const ChatHistorySkeleton = () => {
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
