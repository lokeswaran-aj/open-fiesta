import type { GatewayLanguageModelEntry } from "@ai-sdk/gateway";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/config";
import { useModels } from "@/stores/use-models";
import { ActionButton } from "./action-button";
import { ModelLogo } from "./model-logo";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

type Props = {
  model: GatewayLanguageModelEntry;
};

export const ModelCard = ({ model }: Props) => {
  const [isTextTruncated, setIsTextTruncated] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const addSelectedModel = useModels((state) => state.addSelectedModel);
  const selectedModels = useModels((state) => state.selectedModels);
  const removeSelectedModel = useModels((state) => state.removeSelectedModel);

  const formatPrice = (price: string) => {
    const priceNum = parseFloat(price);
    const pricePerMillion = (priceNum * 1000000).toFixed(2);
    return `$${pricePerMillion} / million tokens`;
  };

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
    addSelectedModel(model);
  };

  const handleRemoveModel = () => {
    removeSelectedModel(model);
  };

  const isSelected = selectedModels.some((m) => m.id === model.id);

  return (
    <div
      key={model.id}
      className="w-full border rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between px-4 py-3 text-sm bg-card rounded-t-lg border-b gap-2">
        <div className="flex items-center min-w-0 flex-1">
          <ModelLogo modelId={model.id} />
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
          <ActionButton
            type={isSelected ? "remove" : "add"}
            size="md"
            onClick={isSelected ? handleRemoveModel : handleAddModel}
            disabled={
              !isSelected && selectedModels.length >= siteConfig.maxModels
            }
            tooltipText={isSelected ? "Remove Model" : "Add Model"}
          />
        </div>
      </div>
      <div className="px-4 py-3 text-xs bg-card rounded-b-lg">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div className="font-medium text-foreground">ID</div>
            <div className="text-muted-foreground text-right">{model.id}</div>
          </div>
          <div className="flex items-start justify-between">
            <div className="font-medium text-foreground">Input Pricing</div>
            <div className="text-muted-foreground text-right">
              {model.pricing ? formatPrice(model.pricing.input) : "-"}
            </div>
          </div>
          <div className="flex items-start justify-between">
            <div className="font-medium text-foreground">Output Pricing</div>
            <div className="text-muted-foreground text-right">
              {model.pricing ? formatPrice(model.pricing.output) : "-"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
