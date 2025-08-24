import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { siteConfig } from "@/lib/config";
import { AvailableModelsList } from "./available-model-lists";
import { SelectedModel } from "./selected-model";

export const ModelSelector = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="size-4" />
          Manage Models
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-6xl h-[90dvh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Models</DialogTitle>
          <DialogDescription>
            Select between 1 to {siteConfig.maxModels} models for your
            conversation.
          </DialogDescription>
        </DialogHeader>
        <SelectedModel />
        <AvailableModelsList />
      </DialogContent>
    </Dialog>
  );
};
