import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ModelList } from "./model-list";
import { SelectedModel } from "./selected-model";
import Icons from "./ui/icons";

export const ModelSelector = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Icons.sparkles className="size-5" />
          Manage Models
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-6xl h-[90dvh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Model</DialogTitle>
          <DialogDescription>
            Select the model you want to use for your conversation.
          </DialogDescription>
        </DialogHeader>
        <SelectedModel />
        <ModelList />
      </DialogContent>
    </Dialog>
  );
};
