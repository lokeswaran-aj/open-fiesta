"use client";

import { ArrowUp, Paperclip, Square, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { v7 as uuidv7 } from "uuid";
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/prompt-kit/prompt-input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useInput } from "@/stores/use-input";
import { useModels } from "@/stores/use-models";

type ChatInputProps = {
  input: string;
  setInput: (input: string) => void;
};

export const ChatInput = (props: ChatInputProps) => {
  const { input, setInput } = props;
  const { data } = authClient.useSession();
  const pathname = usePathname();
  const router = useRouter();

  const isLoading = useInput((state) => state.isLoading);
  const setShouldSubmit = useInput((state) => state.setShouldSubmit);
  const setShouldStop = useInput((state) => state.setShouldStop);
  const selectedModels = useModels((state) => state.selectedModels);

  const [files, setFiles] = useState<File[]>([]);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    if (uploadInputRef?.current) {
      uploadInputRef.current.value = "";
    }
  };

  const isInputValid = input.trim() && selectedModels.length > 0 && !isLoading;

  const handleSubmit = () => {
    if (!data) {
      return router.push("/auth");
    }

    if (!isInputValid) return;

    if (pathname === "/") router.push(`/c/${uuidv7()}`);
    else if (pathname.includes("/c/")) setShouldSubmit(true);
  };

  return (
    <PromptInput
      value={input}
      onValueChange={setInput}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      className="w-full max-w-(--breakpoint-md) bg-input"
    >
      {files.length > 0 && (
        <div className="flex flex-wrap gap-2 pb-2">
          {files.map((file, index) => (
            <div
              key={file.name}
              className="bg-secondary flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
            >
              <Paperclip className="size-4" />
              <span className="max-w-[120px] truncate">{file.name}</span>
              <button
                onClick={() => handleRemoveFile(index)}
                type="button"
                className="hover:bg-secondary/50 rounded-full p-1"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <PromptInputTextarea placeholder="Spill the tea..." autoFocus />

      <PromptInputActions className="flex items-center justify-between gap-2 pt-2">
        <PromptInputAction tooltip="Attach files">
          <label
            htmlFor="file-upload"
            className="hover:bg-secondary-foreground/10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-2xl"
          >
            <input
              ref={uploadInputRef}
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <Paperclip className="text-primary size-5" />
          </label>
        </PromptInputAction>

        <PromptInputAction
          tooltip={isLoading ? "Stop generation" : "Send message"}
        >
          {isLoading ? (
            <Button
              variant="default"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => setShouldStop(true)}
            >
              <Square className="size-4 fill-current" />
            </Button>
          ) : (
            <Button
              variant="default"
              size="icon"
              className="h-8 w-8 rounded-full"
              disabled={!isInputValid}
              onClick={handleSubmit}
            >
              <ArrowUp className="size-5" />
            </Button>
          )}
        </PromptInputAction>
      </PromptInputActions>
    </PromptInput>
  );
};
