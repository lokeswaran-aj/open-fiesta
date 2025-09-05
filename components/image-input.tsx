"use client";

import { ArrowUp, Paperclip, Square, X } from "lucide-react";
import {
  PromptInput,
  PromptInputAction,
  PromptInputActions,
  PromptInputTextarea,
} from "@/components/prompt-kit/prompt-input";
import { Button } from "@/components/ui/button";

type ImageInputProps = {
  input: string;
  setInput: (input: string) => void;
  isLoading: boolean;
  handleSubmit: () => void;
  stop: () => void;
  files: FileList[];
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveFile: (index: number) => void;
  uploadInputRef: React.RefObject<HTMLInputElement | null>;
};

export const ImageInput = (props: ImageInputProps) => {
  const {
    input,
    setInput,
    handleSubmit,
    isLoading,
    stop,
    files,
    handleFileChange,
    handleRemoveFile,
    uploadInputRef,
  } = props;

  const isInputValid = input.trim() && !isLoading;

  const onSubmit = () => {
    if (!isInputValid) return;
    handleSubmit();
  };

  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-2 p-4">
      <PromptInput
        value={input}
        onValueChange={setInput}
        isLoading={isLoading}
        onSubmit={onSubmit}
        className="w-full max-w-(--breakpoint-md) bg-input"
      >
        {files.length > 0 && (
          <div className="flex flex-wrap gap-2 pb-2">
            {files.map((fileList, fileListIndex) =>
              Array.from(fileList).map((file, fileIndex) => (
                <div
                  key={`${fileListIndex}-${fileIndex}-${file.name}`}
                  className="bg-secondary flex items-center gap-2 rounded-lg px-3 py-2 text-sm"
                >
                  <Paperclip className="size-4" />
                  <span className="max-w-[120px] truncate">{file.name}</span>
                  <button
                    onClick={() => handleRemoveFile(fileListIndex)}
                    type="button"
                    className="hover:bg-secondary/50 rounded-full p-1"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              )),
            )}
          </div>
        )}

        <PromptInputTextarea placeholder="Spill the tea..." autoFocus />

        <PromptInputActions className="flex items-center justify-between gap-2 pt-2">
          <PromptInputAction tooltip="Attach image (1 image max)">
            <label
              htmlFor="image-upload"
              className="hover:bg-secondary-foreground/10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-2xl"
            >
              <input
                ref={uploadInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id="image-upload"
                aria-label="Attach image"
              />
              <Paperclip className="text-primary size-5" aria-hidden="true" />
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
                onClick={stop}
              >
                <Square className="size-4 fill-current" />
              </Button>
            ) : (
              <Button
                variant="default"
                size="icon"
                className="h-8 w-8 rounded-full"
                disabled={!isInputValid || isLoading}
                onClick={onSubmit}
              >
                <ArrowUp className="size-5" />
              </Button>
            )}
          </PromptInputAction>
        </PromptInputActions>
      </PromptInput>
    </div>
  );
};
