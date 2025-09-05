"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Check, Copy, Download } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import { toast } from "sonner";
import { ImageInput } from "@/components/image-input";
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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { imageHelpers } from "@/lib/image-helpers";
import { cn } from "@/lib/utils";
import { useRateLimit } from "@/stores/use-rate-limit";

export default function ImagePage() {
  const { data } = authClient.useSession();
  const [prompt, setPrompt] = useState("");

  const [files, setFiles] = useState<FileList[]>([]);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      if (selectedFiles.length > 1) {
        toast.error("Please select only one image file");
        if (uploadInputRef?.current) {
          uploadInputRef.current.value = "";
        }
        return;
      }

      const file = selectedFiles[0];

      const validImageTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/svg+xml",
      ];

      if (!validImageTypes.includes(file.type)) {
        toast.error(
          "Please select a valid image file (JPEG, JPG, PNG, WEBP or SVG)",
        );
        if (uploadInputRef?.current) {
          uploadInputRef.current.value = "";
        }
        return;
      }

      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast.error("Image file size must be less than 10MB");
        if (uploadInputRef?.current) {
          uploadInputRef.current.value = "";
        }
        return;
      }

      setFiles([selectedFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (uploadInputRef?.current) {
      uploadInputRef.current.value = "";
    }
  };

  const router = useRouter();
  const [copiedUserMessage, setCopiedUserMessage] = useState(false);
  const {
    canGenerateImage,
    incrementImageGeneration,
    imageGenerationCount,
    getNextAvailableTime,
  } = useRateLimit();

  const { sendMessage, status, messages, stop } = useChat({
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

  const isLoading = status === "streaming" || status === "submitted";

  const handleSubmit = async () => {
    if (!data?.user) {
      router.push("/auth?next=/image");
      return;
    }

    if (!prompt.trim()) return;

    if (!canGenerateImage()) {
      const timeRemaining = getNextAvailableTime();
      toast.error(
        `You've reached the limit of image generations. Come back in ${timeRemaining}!`,
      );
      return;
    }

    setPrompt("");
    setFiles([]);

    await sendMessage({
      text: prompt.trim(),
      files: files.length > 0 ? files[0] : undefined,
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
          {isLoading && (
            <Skeleton className="h-96 w-full max-w-96 animate-pulse rounded-lg" />
          )}
        </ChatContainerContent>
      </ChatContainerRoot>
      <div className="inset-x-0 bottom-0 mx-auto w-full max-w-3xl shrink-0 px-3 pb-3 md:px-5 md:pb-5">
        <div className="mb-3 text-center text-sm text-muted-foreground">
          {imageGenerationCount}/10 image generated per day
        </div>
        <ImageInput
          input={prompt}
          setInput={setPrompt}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          stop={stop}
          files={files}
          handleFileChange={handleFileChange}
          handleRemoveFile={handleRemoveFile}
          uploadInputRef={uploadInputRef}
        />
      </div>
    </div>
  );
}
