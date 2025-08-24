"use client";

import type { GatewayLanguageModelEntry } from "@ai-sdk/gateway";
import { X } from "lucide-react";
import { useModels } from "@/stores/use-models";
import { ModelLogo } from "./model-logo";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export const SelectedModel = () => {
  const selectedModels = useModels((state) => state.selectedModels);
  const removeSelectedModel = useModels((state) => state.removeSelectedModel);

  const handleRemoveModel = (model: GatewayLanguageModelEntry) => {
    removeSelectedModel(model);
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Selected Models</h2>
      <div className="flex gap-2 overflow-x-auto pb-4">
        {selectedModels.map((model) => (
          <div
            key={model.id}
            className="flex items-center gap-2 border rounded-md py-2 px-4 text-sm text-nowrap"
          >
            <ModelLogo modelId={model.id} />
            <p>{model.name}</p>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-5 h-5 rounded-full p-0 flex items-center justify-center border-none"
                  onClick={() => handleRemoveModel(model)}
                  style={{
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                  }}
                >
                  <X className="size-3" strokeWidth={3.5} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove Model</p>
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};
