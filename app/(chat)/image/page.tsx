"use client";

import type { UIMessage } from "ai";
import { ArrowUp, Check, Copy, Download, Loader2 } from "lucide-react";
import Image from "next/image";
import { Fragment, useState } from "react";
import { v7 as uuidv7 } from "uuid";
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
import { cn } from "@/lib/utils";

export default function ConversationPromptInput() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [messages, setMessages] = useState<UIMessage[]>([]);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setPrompt("");
    setIsLoading(true);

    const newUserMessage = {
      id: uuidv7(),
      role: "user" as const,
      parts: [{ type: "text" as const, text: prompt.trim() }],
    };

    setMessages((prev) => [...prev, newUserMessage]);

    const response = await fetch("/api/image", {
      method: "POST",
      body: JSON.stringify({ messages: [newUserMessage] }),
    });
    const data = await response.json();
    setMessages((prev) => [...prev, data]);
    setIsLoading(false);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <ChatContainerRoot className="relative flex-1 space-y-0 overflow-y-auto px-4 py-12">
        <ChatContainerContent className="space-y-6 px-4 py-12">
          {messages.map((message) => {
            console.log(message);
            const isAssistant = message.role === "assistant";

            return (
              <Message
                key={message.id}
                className={cn(
                  "mx-auto flex w-full max-w-3xl flex-col gap-2 px-0 md:px-6",
                  isAssistant ? "items-start" : "items-end",
                )}
              >
                {isAssistant ? (
                  <div className="group flex w-full flex-col gap-2">
                    {(() => {
                      const filePart = message.parts.find(
                        (part) => part.type === "file" && "file" in part,
                      );

                      if (
                        filePart &&
                        filePart.type === "file" &&
                        "file" in filePart
                      ) {
                        return (
                          <Fragment key={`${message.id}-file`}>
                            <Image
                              src={`data:image/png;base64,${(filePart.file as { base64Data: string }).base64Data}`}
                              alt={"Generated image"}
                              height={400}
                              width={400}
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
                                >
                                  <Download />
                                </Button>
                              </MessageAction>
                            </MessageActions>
                          </Fragment>
                        );
                      } else {
                        const textPart = message.parts.find(
                          (part) => part.type === "text",
                        );
                        if (textPart && textPart.type === "text") {
                          return (
                            <MessageContent
                              key={`${message.id}-text`}
                              className="text-foreground prose w-full flex-1 rounded-lg bg-transparent p-0"
                              markdown
                            >
                              {textPart.text}
                            </MessageContent>
                          );
                        }
                      }
                      return null;
                    })()}
                  </div>
                ) : (
                  <div className="group flex flex-col items-end gap-1">
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        return (
                          <Fragment key={`${message.id}-${part.type}-${index}`}>
                            <MessageContent className="bg-muted text-primary min-w-fit max-w-[85%] rounded-3xl px-5 py-2.5 sm:max-w-[75%]">
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
                                    setCopied(true);
                                    setTimeout(() => {
                                      setCopied(false);
                                    }, 1000);
                                  }}
                                >
                                  {copied ? <Check /> : <Copy />}
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
        </ChatContainerContent>
      </ChatContainerRoot>
      <div className="inset-x-0 bottom-0 mx-auto w-full max-w-3xl shrink-0 px-3 pb-3 md:px-5 md:pb-5">
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
