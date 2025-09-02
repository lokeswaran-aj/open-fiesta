"use client";

import { Check, MoreHorizontal, Pen, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

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

  const handleRenameClick = (chatId: string, currentTitle: string) => {
    setEditingId(chatId);
    setEditingTitle(currentTitle);
  };

  const handleRenameSave = async (chatId: string) => {
    try {
      await fetch(`/api/title`, {
        method: "PUT",
        body: JSON.stringify({ input: editingTitle, chatId }),
      });

      setHistory(
        history.map((item) =>
          item.id === chatId ? { ...item, title: editingTitle } : item,
        ),
      );

      setEditingId(null);
      setEditingTitle("");
      toast.success("Chat title updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update chat title");
    }
  };

  const handleRenameCancel = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {history.map((item, index) => (
          <SidebarMenuItem key={`${item.id}-${index}`}>
            {editingId === item.id ? (
              <div className="min-w-0 flex-1 flex items-center gap-1 px-3 py-2">
                <Input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="h-6 text-sm border-none bg-transparent p-0 focus-visible:ring-0 flex-1"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleRenameSave(item.id);
                    } else if (e.key === "Escape") {
                      handleRenameCancel();
                    }
                  }}
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 hover:bg-accent"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRenameSave(item.id);
                  }}
                >
                  <Check className="h-3 w-3" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-6 w-6 p-0 hover:bg-accent"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRenameCancel();
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ) : (
              <SidebarMenuButton
                asChild
                onClick={() => router.push(`/c/${item.id}`)}
              >
                <div className="min-w-0 flex-1">
                  <span className="block truncate text-left">{item.title}</span>
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
                      <DropdownMenuItem
                        onClick={() => handleRenameClick(item.id, item.title)}
                      >
                        <Pen className="text-muted-foreground" />
                        <span>Rename</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeleteChat(item.id)}
                      >
                        <Trash2 className="text-destructive" />
                        <span className="text-destructive">Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </SidebarMenuButton>
            )}
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
