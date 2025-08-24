"use client";

import { X } from "lucide-react";
import { useModels } from "@/stores/use-models";
import { ModelLogo } from "./model-logo";

export const SelectedModel = () => {
  const selectedModels = useModels((state) => state.selectedModels);
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">Selected Models</h2>
      <div className="flex gap-2 overflow-x-auto">
        {selectedModels.map((model) => (
          <div
            key={model.id}
            className="flex items-center gap-1 border rounded-md py-2 px-4 text-sm text-nowrap"
          >
            <ModelLogo modelId={model.id} />
            <p>{model.name}</p>
            <div className="flex items-center gap-2 cursor-pointer">
              <X className="size-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
