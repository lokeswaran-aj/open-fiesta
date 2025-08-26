import { create } from "zustand";
import { persist } from "zustand/middleware";

type ApiKeyStore = {
  vercelApiKey: string;
  setVercelApiKey: (vercelApiKey: string) => void;
  openRouterApiKey: string;
  setOpenRouterApiKey: (openRouterApiKey: string) => void;
  aimlApiKey: string;
  setAimlApiKey: (aimlApiKey: string) => void;
};

export const useApiKey = create<ApiKeyStore>()(
  persist(
    (set) => ({
      vercelApiKey: "",
      setVercelApiKey: (vercelApiKey: string) => set({ vercelApiKey }),
      openRouterApiKey: "",
      setOpenRouterApiKey: (openRouterApiKey: string) =>
        set({ openRouterApiKey }),
      aimlApiKey: "",
      setAimlApiKey: (aimlApiKey: string) => set({ aimlApiKey }),
    }),
    {
      name: "api-key",
      partialize: (state) => ({
        vercelApiKey: state.vercelApiKey,
        openRouterApiKey: state.openRouterApiKey,
        aimlApiKey: state.aimlApiKey,
      }),
    },
  ),
);
