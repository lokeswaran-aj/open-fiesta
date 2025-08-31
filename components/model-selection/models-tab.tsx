import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Model } from "@/lib/types";
import { ProviderSection } from "./provider-section";

export const ModelsTab = ({
  sortedProviders,
}: {
  sortedProviders: Array<{ [key: string]: unknown }>;
}) => (
  <Tabs defaultValue="vercel" className="h-full flex flex-col">
    <TabsList className="grid w-full grid-cols-2">
      <TabsTrigger value="vercel">Vercel</TabsTrigger>
      {/* <TabsTrigger value="aimlapi">AIML API</TabsTrigger> */}
      <TabsTrigger value="openrouter">OpenRouter</TabsTrigger>
    </TabsList>

    {sortedProviders.map((gatewayObj) => {
      const gateway = Object.keys(gatewayObj)[0];
      const providers = gatewayObj[gateway] as [string, Model[]][];
      return (
        <TabsContent key={gateway} value={gateway} className="flex-1 mt-4">
          <div className="space-y-6 pr-2">
            {providers.map(([providerName, models]) => (
              <ProviderSection
                key={providerName}
                providerName={providerName}
                models={models}
              />
            ))}
          </div>
        </TabsContent>
      );
    })}
  </Tabs>
);
