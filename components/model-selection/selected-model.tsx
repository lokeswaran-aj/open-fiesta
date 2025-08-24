"use client";

import { useModels } from "@/stores/use-models";
import { ActionButton } from "./action-button";
import { ModelLogo } from "./model-logo";

export const SelectedModel = () => {
  const selectedModels = useModels((state) => state.selectedModels);
  const removeSelectedModel = useModels((state) => state.removeSelectedModel);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">
        Selected Models ({selectedModels.length})
      </h2>
      <div className="flex gap-2 overflow-x-auto pb-4">
        {selectedModels.map((model) => (
          <div
            key={model.id}
            className="flex items-center gap-2 border rounded-md py-2 px-4 text-sm text-nowrap"
          >
            <ModelLogo modelId={model.id} />
            <p>{model.name}</p>
            <ActionButton
              type="remove"
              size="sm"
              onClick={() => removeSelectedModel(model)}
              tooltipText="Remove Model"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
