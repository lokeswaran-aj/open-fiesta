"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { SidebarGroup, SidebarMenu, useSidebar } from "@/components/ui/sidebar";
import { useHistory } from "@/stores/use-history";
import { ChatHistoryItem, ChatHistorySkeleton } from "./index";

const LIMIT = 30;

export const ChatHistory = () => {
  const { isMobile, setOpenMobile } = useSidebar();
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
    setTitle,
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
      if (editingId === chatId) {
        setTitle(editingTitle);
      }
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

  const handleClick = (chatId: string) => {
    router.push(`/c/${chatId}`);
    setTitle(history.find((item) => item.id === chatId)?.title || "New Chat");
    isMobile && setOpenMobile(false);
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {history.map((item, index) => (
          <ChatHistoryItem
            key={`${item.id}-${index}`}
            item={item}
            isEditing={editingId === item.id}
            editingTitle={editingTitle}
            onRename={handleRenameClick}
            onDelete={handleDeleteChat}
            onSave={handleRenameSave}
            onCancel={handleRenameCancel}
            onChange={setEditingTitle}
            onClick={() => handleClick(item.id)}
            isMobile={isMobile}
          />
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
