"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { ArrowUp, Check, Copy, Download, Loader2 } from "lucide-react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import {
  ChatContainerContent,
  ChatContainerRoot,
} from "@/components/prompt-kit/chat-container";
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
} from "@/components/prompt-kit/message";
import {
  PromptInput,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/prompt-kit/prompt-input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { imageHelpers } from "@/lib/image-helpers";
import { cn } from "@/lib/utils";
import { useRateLimit } from "@/stores/use-rate-limit";

export default function ConversationPromptInput() {
  const [prompt, setPrompt] = useState("");
  const [copiedUserMessage, setCopiedUserMessage] = useState(false);
  const {
    canGenerateImage,
    incrementImageGeneration,
    imageGenerationCount,
    getNextAvailableTime,
  } = useRateLimit();

  const { sendMessage, status, messages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/image",
    }),
    onFinish: ({ message }) => {
      if (message.parts.find((part) => part.type === "file")?.url) {
        incrementImageGeneration();
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error generating image");
    },
  });

  const hasSubmitted = status === "submitted";
  const isLoading = status === "streaming" || hasSubmitted;

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    if (!canGenerateImage()) {
      const timeRemaining = getNextAvailableTime();
      toast.error(
        `You've reached the limit of image generations. Come back in ${timeRemaining}!`,
      );
      return;
    }

    setPrompt("");

    sendMessage({
      text: prompt.trim(),
    });
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <ChatContainerRoot className="relative flex-1 space-y-0 overflow-y-auto">
        <ChatContainerContent className="space-y-6 px-4 py-12 mx-auto w-full max-w-3xl md:px-6">
          {messages.map((message) => {
            const isAssistant = message.role === "assistant";

            return (
              <Message
                key={message.id}
                className={cn(
                  "flex flex-col gap-2 px-0",
                  isAssistant ? "items-start" : "items-end",
                )}
              >
                {isAssistant ? (
                  <div className="group flex w-full flex-col gap-2">
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        return (
                          <MessageContent
                            key={`${message.id}-${part.type}-${index}`}
                            className="text-foreground prose w-full flex-1 rounded-lg bg-transparent p-0"
                            markdown
                          >
                            {part.text}
                          </MessageContent>
                        );
                      } else if (part.type === "file") {
                        return (
                          <Fragment key={`${message.id}-${part.type}-${index}`}>
                            <Image
                              src={part.url}
                              alt={"Generated image"}
                              height={384}
                              width={384}
                              className="rounded-lg shadow-lg"
                            />
                            <MessageActions className="-ml-2.5 flex gap-0">
                              <MessageAction
                                tooltip="Download"
                                delayDuration={100}
                              >
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-full"
                                  onClick={() => {
                                    imageHelpers.downloadImage(part.url);
                                  }}
                                >
                                  <Download />
                                </Button>
                              </MessageAction>
                            </MessageActions>
                          </Fragment>
                        );
                      }
                      return null;
                    })}
                  </div>
                ) : (
                  <div className="group flex flex-col items-end gap-1">
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        return (
                          <Fragment key={`${message.id}-${part.type}-${index}`}>
                            <MessageContent className="bg-primary text-primary-foreground min-w-fit max-w-[85%] rounded-3xl px-5 py-2.5 sm:max-w-[75%]">
                              {part.text}
                            </MessageContent>
                            <MessageActions className="flex gap-0">
                              <MessageAction tooltip="Copy" delayDuration={100}>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="rounded-full"
                                  onClick={() => {
                                    navigator.clipboard.writeText(part.text);
                                    setCopiedUserMessage(true);
                                    setTimeout(() => {
                                      setCopiedUserMessage(false);
                                    }, 1000);
                                  }}
                                >
                                  {copiedUserMessage ? <Check /> : <Copy />}
                                </Button>
                              </MessageAction>
                            </MessageActions>
                          </Fragment>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </Message>
            );
          })}
          {hasSubmitted && (
            <Skeleton className="h-96 w-full max-w-96 animate-pulse rounded-lg" />
          )}
        </ChatContainerContent>
      </ChatContainerRoot>
      <div className="inset-x-0 bottom-0 mx-auto w-full max-w-3xl shrink-0 px-3 pb-3 md:px-5 md:pb-5">
        <div className="mb-3 text-center text-sm text-muted-foreground">
          {imageGenerationCount}/10 image generated per day
        </div>
        <PromptInput
          isLoading={isLoading}
          value={prompt}
          onValueChange={setPrompt}
          onSubmit={handleSubmit}
          className="border-input relative z-10 w-full rounded-3xl border p-0 pt-1 shadow-xs bg-input"
        >
          <div className="flex flex-col">
            <PromptInputTextarea
              aria-label="Image prompt"
              autoFocus
              name="image-prompt"
              id="image-prompt"
              placeholder="Drop your wildest image idea here 🤯✨"
              className="min-h-[44px] pt-3 pl-4 text-base leading-[1.3] sm:text-base md:text-base"
            />

            <PromptInputActions className="pt-2 flex w-full items-center justify-end gap-2 px-3 pb-3">
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  disabled={!prompt.trim() || isLoading}
                  onClick={handleSubmit}
                  className="size-9 rounded-full"
                >
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <ArrowUp size={18} />
                  )}
                </Button>
              </div>
            </PromptInputActions>
          </div>
        </PromptInput>
      </div>
    </div>
  );
}
