"use client";

import { ArrowLeft, KeyRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ConfigInput } from "@/components/api-key-configuration/config-input";
import { Button } from "@/components/ui/button";
import { useApiKey } from "@/stores/use-api-key";

const ApiKeyPage = () => {
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

  useEffect(() => {
    setApiKey({
      openRouterApiKey,
      vercelApiKey,
      aimlApiKey,
    });
  }, [openRouterApiKey, vercelApiKey, aimlApiKey]);

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
    <div className="py-8 px-4">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Chat
        </Link>
      </div>

      <div className="container mx-auto max-w-2xl space-y-6 mt-20">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <KeyRound className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">API Key Configuration</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Drop your API keys here to unlock the vibes. We&apos;ll keep them
            safe in your browser&apos;s local storage.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <ConfigInput
              id="vercel-ai-gateway-api-key"
              name="vercel-ai-gateway-api-key"
              placeholder="vck_..."
              label="Vercel AI Gateway API Key"
              appHref="https://vercel.com/ai-gateway?utm_source=open-fiesta.com"
              appTitle="Vercel AI Gateway"
              getApiKeyHref="https://vercel.com/d?to=/[team]/~/ai/api-keys?utm_source=open-fiesta.com&title=Get%20an%20API%20Key"
              value={apiKey.vercelApiKey}
              onChange={(value) => {
                setApiKey({ ...apiKey, vercelApiKey: value });
              }}
            />
            <ConfigInput
              id="openrouter-api-key"
              name="openrouter-api-key"
              placeholder="sk-or-v1-..."
              label="OpenRouter API Key"
              appHref="https://openrouter.ai?utm_source=open-fiesta.com"
              appTitle="OpenRouter"
              getApiKeyHref="https://openrouter.ai/sign-in?redirect_url=https://openrouter.ai/settings/keys&utm_source=open-fiesta.com"
              value={apiKey.openRouterApiKey}
              onChange={(value) => {
                setApiKey({ ...apiKey, openRouterApiKey: value });
              }}
            />
            {/* <ConfigInput
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
            /> */}
          </div>

          <div className="flex gap-3 justify-center">
            <Button variant="outline" type="button" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
              Save API Keys
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyPage;
