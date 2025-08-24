"use client";
import { useEffect } from "react";
import { toast } from "sonner";
import { useModels } from "@/stores/use-models";
import { ModelCard } from "./model-card";

export const AvailableModelsList = () => {
  const { models, setModels } = useModels((state) => state);

  useEffect(() => {
    const fetchModels = async () => {
      const res = await fetch("/api/models");
      const data = await res.json();
      if (res.ok) {
        setModels(data.models);
      } else {
        toast.error(data.error);
      }
    };
    fetchModels();
  }, [setModels]);

  return (
    <div className="flex-1 overflow-y-auto">
      <h2 className="text-lg font-semibold">Available Models</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-1">
        {models.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
    </div>
  );
};
