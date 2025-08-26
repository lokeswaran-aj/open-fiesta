"use client";

import { Settings2Icon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { siteConfig } from "@/lib/config";
import { useDialogState } from "@/stores/use-dialog-state";
import { Button } from "../ui/button";
import { AvailableModelsList } from "./available-model-lists";
import { SelectedModel } from "./selected-model";

export const ModelSelector = () => {
  const { isModelSelectorOpen, setModelSelectorOpen } = useDialogState();

  return (
    <Dialog open={isModelSelectorOpen} onOpenChange={setModelSelectorOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings2Icon className="size-4" />
          <span>Pick a model</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-6xl h-[90dvh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Pick Your Model Squad</DialogTitle>
          <DialogDescription>
            Choose between 1 and {siteConfig.maxModels} models to vibe with in
            your convo.
          </DialogDescription>
        </DialogHeader>
        <SelectedModel />
        <hr />
        <AvailableModelsList />
      </DialogContent>
    </Dialog>
  );
};
