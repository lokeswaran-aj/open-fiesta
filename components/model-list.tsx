"use client";
import { useEffect } from "react";
import { toast } from "sonner";
import { useModels } from "@/stores/use-models";
import { MessageAvatar } from "./prompt-kit/message";
import ProviderLogos from "./ui/provider-logos";

export const ModelList = () => {
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

  const formatPrice = (price: string) => {
    const priceNum = parseFloat(price);
    const pricePerMillion = (priceNum * 1000000).toFixed(2);
    return `$${pricePerMillion} / million tokens`;
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-1">
        {models.map((model) => (
          <div
            key={model.id}
            className="w-full border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="px-4 py-3 text-sm bg-card rounded-t-lg border-b">
              <div className="flex items-center">
                <div className="mr-2">
                  {(() => {
                    const providerKey = model.id.split(
                      "/",
                    )[0] as keyof typeof ProviderLogos;
                    const Logo = ProviderLogos[providerKey];
                    return Logo ? (
                      Logo(16)
                    ) : (
                      <MessageAvatar
                        fallback={providerKey.charAt(0).toUpperCase()}
                      />
                    );
                  })()}
                </div>
                <div className="space-x-1 truncate">
                  <span className="font-medium text-foreground truncate">
                    {model.name}
                  </span>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 text-xs bg-card rounded-b-lg">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="font-medium text-foreground">ID</div>
                  <div className="text-muted-foreground text-right">
                    {model.id}
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div className="font-medium text-foreground">
                    Input Pricing
                  </div>
                  <div className="text-muted-foreground text-right">
                    {model.pricing ? formatPrice(model.pricing.input) : "-"}
                  </div>
                </div>
                <div className="flex items-start justify-between">
                  <div className="font-medium text-foreground">
                    Output Pricing
                  </div>
                  <div className="text-muted-foreground text-right">
                    {model.pricing ? formatPrice(model.pricing.output) : "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
