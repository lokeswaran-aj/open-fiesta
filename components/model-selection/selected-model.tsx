"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripHorizontal } from "lucide-react";
import type { Model } from "@/lib/types";
import { useModels } from "@/stores/use-models";
import { ActionButton } from "./action-button";
import { ModelLogo } from "./model-logo";

// Sortable item component
const SortableModelItem = ({
  model,
  removeSelectedModel,
}: {
  model: Model;
  removeSelectedModel: (model: Model) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: model.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 border rounded-md py-2 px-4 text-sm text-nowrap bg-background ${
        isDragging ? "opacity-50 shadow-lg z-50" : ""
      }`}
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing hover:text-muted-foreground transition-colors"
        aria-label="Drag to reorder model"
      >
        <GripHorizontal size={16} />
      </button>
      <ModelLogo provider={model.provider} />
      <p>{model.name}</p>
      <ActionButton
        type="remove"
        size="sm"
        onClick={() => removeSelectedModel(model)}
        tooltipText="Remove Model"
      />
    </div>
  );
};

export const SelectedModel = () => {
  const selectedModels = useModels((state) => state.selectedModels);
  const removeSelectedModel = useModels((state) => state.removeSelectedModel);
  const reorderSelectedModels = useModels(
    (state) => state.reorderSelectedModels,
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = selectedModels.findIndex(
        (model) => model.id === active.id,
      );
      const newIndex = selectedModels.findIndex(
        (model) => model.id === over.id,
      );

      reorderSelectedModels(oldIndex, newIndex);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">
        Selected Models ({selectedModels.length})
      </h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={selectedModels.map((model) => model.id)}
          strategy={horizontalListSortingStrategy}
        >
          <div className="flex gap-2 overflow-x-auto pb-4">
            {selectedModels.map((model) => (
              <SortableModelItem
                key={model.id}
                model={model}
                removeSelectedModel={removeSelectedModel}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};
