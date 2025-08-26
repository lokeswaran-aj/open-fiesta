import { Settings2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useApiKey } from "@/stores/use-api-key";
import { ConfigInput } from "./config-input";

export const ConfigDialog = () => {
  const {
    vercelApiKey,
    setVercelApiKey,
    openRouterApiKey,
    setOpenRouterApiKey,
    aimlApiKey,
    setAimlApiKey,
  } = useApiKey();
  const [apiKey, setApiKey] = useState({
    openRouterApiKey,
    vercelApiKey,
    aimlApiKey,
  });

  const handleSave = () => {
    setVercelApiKey(apiKey.vercelApiKey);
    setOpenRouterApiKey(apiKey.openRouterApiKey);
    setAimlApiKey(apiKey.aimlApiKey);
    toast.success("API key saved");
  };

  const handleCancel = () => {
    setApiKey({
      openRouterApiKey,
      vercelApiKey,
      aimlApiKey,
    });
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Settings2Icon className="w-4 h-4" />
            Config API Key
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[425px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Config API Key</DialogTitle>
            <DialogDescription>
              Enter your API key to use the app. These keys are stored in the
              browser&apos;s local storage.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <ConfigInput
              id="openrouter-api-key"
              name="openrouter-api-key"
              placeholder="sk-or-v1-..."
              label="OpenRouter API Key"
              appHref="https://openrouter.ai?utm_source=open-fiesta.com"
              appTitle="OpenRouter"
              getApiKeyHref="https://openrouter.ai/sign-in?redirect_url=https://openrouter.ai/settings/keys&utm_source=open-fiesta.com"
              defaultValue={openRouterApiKey}
              onChange={(value) => {
                setApiKey({ ...apiKey, openRouterApiKey: value });
              }}
            />
            <ConfigInput
              id="vercel-ai-gateway-api-key"
              name="vercel-ai-gateway-api-key"
              placeholder="vck_..."
              label="Vercel AI Gateway API Key"
              appHref="https://vercel.com/ai-gateway?utm_source=open-fiesta.com"
              appTitle="Vercel AI Gateway"
              getApiKeyHref="https://vercel.com/d?to=/[team]/~/ai/api-keys?utm_source=open-fiesta.com&title=Get%20an%20API%20Key"
              defaultValue={apiKey.vercelApiKey}
              onChange={(value) => {
                setApiKey({ ...apiKey, vercelApiKey: value });
              }}
            />
            <ConfigInput
              id="aiml-api-key"
              name="aiml-api-key"
              placeholder="8g1b..."
              label="AIML API Key"
              appHref="https://aimlapi.com?utm_source=open-fiesta.com"
              appTitle="AIML"
              getApiKeyHref="https://aimlapi.com/app/keys?utm_source=open-fiesta.com"
              defaultValue={apiKey.aimlApiKey}
              onChange={(value) => {
                setApiKey({ ...apiKey, aimlApiKey: value });
              }}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button" onClick={handleCancel}>
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={handleSave}>
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
