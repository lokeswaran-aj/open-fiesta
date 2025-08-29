import { Key } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { siteConfig } from "@/lib/config";
import type { Model } from "@/lib/types";
import { useApiKey } from "@/stores/use-api-key";
import { useDialogState } from "@/stores/use-dialog-state";
import { useModels } from "@/stores/use-models";
import { ActionButton } from "./action-button";
import { ModelLogo } from "./model-logo";

type Props = {
  model: Model;
};

export const ModelCard = ({ model }: Props) => {
  const [isTextTruncated, setIsTextTruncated] = useState(false);
  const { id } = useParams();
  const textRef = useRef<HTMLSpanElement>(null);
  const addSelectedModel = useModels((state) => state.addSelectedModel);
  const selectedModels = useModels((state) => state.selectedModels);
  const removeSelectedModel = useModels((state) => state.removeSelectedModel);
  const { openConfigDialogFromModelSelector } = useDialogState();
  const aimlApiKey = useApiKey((state) => state.aimlApiKey);
  const openRouterApiKey = useApiKey((state) => state.openRouterApiKey);
  const vercelApiKey = useApiKey((state) => state.vercelApiKey);

  useEffect(() => {
    const checkTruncation = () => {
      if (textRef.current) {
        const isOverflowing =
          textRef.current.scrollWidth > textRef.current.clientWidth;
        setIsTextTruncated(isOverflowing);
      }
    };

    checkTruncation();
    window.addEventListener("resize", checkTruncation);
    return () => window.removeEventListener("resize", checkTruncation);
  }, []);

  const handleAddModel = () => {
    console.log("adding model", id);
    addSelectedModel(model);
  };

  const handleRemoveModel = () => {
    console.log("removing model", id);
    removeSelectedModel(model);
  };

  const isSelected = selectedModels.some((m) => m.id === model.id);

  const shouldEnableModel = (model: Model) => {
    if (model.isFree) return true;
    if (model.gateway === "aimlapi") {
      return aimlApiKey !== "";
    }
    if (model.gateway === "openrouter") {
      return openRouterApiKey !== "";
    }
    if (model.gateway === "vercel") {
      return vercelApiKey !== "";
    }
    return false;
  };

  return (
    <div
      key={model.id}
      className="w-full border rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between px-4 py-3 text-sm bg-card rounded-t-lg border-b gap-2">
        <div className="flex items-center min-w-0 flex-1">
          <ModelLogo provider={model.provider} />
          <div className="min-w-0 flex-1 ml-2">
            {isTextTruncated ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <span
                    ref={textRef}
                    className="font-medium text-foreground block truncate cursor-help"
                  >
                    {model.name}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{model.name}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <span
                ref={textRef}
                className="font-medium text-foreground block truncate"
              >
                {model.name}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {shouldEnableModel(model) ? (
            <ActionButton
              type={isSelected ? "remove" : "add"}
              size="md"
              onClick={isSelected ? handleRemoveModel : handleAddModel}
              disabled={
                !isSelected && selectedModels.length >= siteConfig.maxModels
              }
              tooltipText={isSelected ? "Remove Model" : "Add Model"}
            />
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-6 h-6 rounded-full p-0 flex items-center justify-center border-none cursor-pointer"
                  style={{
                    backgroundColor: "#6b7280",
                    color: "white",
                    border: "none",
                    pointerEvents: "auto",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    openConfigDialogFromModelSelector();
                  }}
                >
                  <Key className="size-3" strokeWidth={3.5} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>BYOK</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </div>
      <div className="px-4 py-3 text-xs bg-card rounded-b-lg">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="font-medium text-foreground">ID</div>
            <div className="text-muted-foreground text-right">
              {model.id.split(":")[1]}
            </div>
          </div>
          <div className="flex items-start justify-between">
            <div className="font-medium text-foreground">Input Pricing</div>
            <div className="text-muted-foreground text-right">
              {model.pricing.input}
            </div>
          </div>
          <div className="flex items-start justify-between">
            <div className="font-medium text-foreground">Output Pricing</div>
            <div className="text-muted-foreground text-right">
              {model.pricing.output}
            </div>
          </div>
          <div className="flex items-start justify-between">
            <div className="font-medium text-foreground">Context</div>
            <div className="text-muted-foreground text-right">
              {model.context}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
