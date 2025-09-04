"use client";
import { Settings2Icon } from "lucide-react";
import { Fragment } from "react";
import type { ConversationsWithMessages } from "@/actions/chat";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDialogState } from "@/stores/use-dialog-state";
import { useModels } from "@/stores/use-models";
import { Conversation } from "./conversation";
import { Button } from "./ui/button";

type Props = {
  chatId: string;
  conversations?: ConversationsWithMessages[];
};

export const MultiConversation = (props: Props) => {
  const { chatId, conversations } = props;
  const selectedModels = useModels((state) => state.selectedModels);
  const setModelSelectorOpen = useDialogState(
    (state) => state.setModelSelectorOpen,
  );
  const isMobile = useIsMobile();
  const handleOpenModelSelector = () => {
    setModelSelectorOpen(true);
  };
  const isLoading = useModels((state) => state.isLoading);

  if (isLoading) {
    return null;
  }

  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const sidebarWidth = 256;
  const availableWidth = isMobile ? screenWidth : screenWidth - sidebarWidth;
  const minWidth = 400;
  const maxWidth = 800;
  const allocationWidth = availableWidth > 500 ? 500 : availableWidth;
  const totalAllocatedWidth = selectedModels.length * allocationWidth;
  const panelGroupWidth = Math.max(totalAllocatedWidth, availableWidth);

  const defaultSizePercentage = 100 / selectedModels.length;
  const minSizePercentage = (minWidth / panelGroupWidth) * 100;
  const maxSizePercentage = (maxWidth / panelGroupWidth) * 100;

  return (
    <div className="flex h-full overflow-hidden">
      {selectedModels.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-gray-500 dark:text-gray-400">
            Pick a model to vibe with 💬✨
          </p>
          <Button variant="outline" size="sm" onClick={handleOpenModelSelector}>
            <Settings2Icon className="size-4" />
            <span>Pick a model</span>
          </Button>
        </div>
      )}
      {selectedModels.length > 0 && (
        <div className="overflow-x-auto h-full flex-1">
          <ResizablePanelGroup
            key={`panel-group-${selectedModels.length}-${selectedModels.map((m) => m.id).join("-")}`}
            direction="horizontal"
            className="h-full border"
            style={{ minWidth: `${panelGroupWidth}px` }}
          >
            {selectedModels.map((model, index) => (
              <Fragment key={model.id}>
                <ResizablePanel
                  defaultSize={defaultSizePercentage}
                  minSize={minSizePercentage}
                  maxSize={maxSizePercentage}
                >
                  <div className="h-full flex flex-col">
                    <Conversation
                      model={model}
                      chatId={chatId}
                      conversation={conversations?.find(
                        (conversation) =>
                          conversation.conversation.model.id === model.id,
                      )}
                    />
                  </div>
                </ResizablePanel>
                {index < selectedModels.length - 1 && (
                  <ResizableHandle
                    withHandle
                    className="border-r border-gray-300 dark:border-gray-700"
                  />
                )}
              </Fragment>
            ))}
          </ResizablePanelGroup>
        </div>
      )}
    </div>
  );
};
