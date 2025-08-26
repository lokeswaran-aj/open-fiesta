"use client";

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
import { AvailableModelsList } from "./available-model-lists";
import { SelectedModel } from "./selected-model";

type Props = {
  trigger: React.ReactNode;
};
export const ModelSelector = (props: Props) => {
  const { trigger } = props;
  const { isModelSelectorOpen, setModelSelectorOpen } = useDialogState();

  return (
    <Dialog open={isModelSelectorOpen} onOpenChange={setModelSelectorOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
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
