import { gateway as aiGateway } from "@ai-sdk/gateway";
import millify from "millify";
import { NextResponse } from "next/server";
import { freeModels } from "@/lib/models";
import type { AIMLModel, Model, OpenRouterModel } from "@/lib/types";

const formatPrice = (price: string) => {
  if (price === "-1") return "-";
  const priceInMillion = Number(price) * 1000000;
  const pricePerMillion = priceInMillion.toFixed(2);

  return pricePerMillion;
};

const fetchOpenRouterModels = async (): Promise<Model[]> => {
  try {
    const response = await fetch("https://openrouter.ai/api/v1/models", {
      next: { revalidate: 3600 },
    });
    const data: OpenRouterModel[] = (await response.json()).data;

    return data.reduce<Model[]>((acc, model) => {
      const provider = model.id.split("/")[0].trim().replace("-", "");
      acc.push({
        id: `openrouter:${model.id}`,
        name: model.name,
        provider,
        context: millify(model.context_length),
        pricing: {
          input: formatPrice(model.pricing.prompt),
          output: formatPrice(model.pricing.completion),
        },
        gateway: "openrouter",
        isFree: freeModels.has(model.id),
      });
      return acc;
    }, []);
  } catch (error) {
    console.error("Failed to fetch OpenRouter models:", error);
    return [];
  }
};

const fetchAIMLModels = async (): Promise<Model[]> => {
  try {
    const response = await fetch("https://api.aimlapi.com/models", {
      next: { revalidate: 3600 },
    });
    const data: AIMLModel[] = (await response.json()).data;

    return data.reduce<Model[]>((acc, model) => {
      if (model.type === "chat-completion") {
        acc.push({
          id: `aimlapi:${model.id}`,
          name: model.info.name,
          provider: model.info.developer.toLowerCase().replace(" ", ""),
          context: millify(model.info.contextLength),
          gateway: "aimlapi",
          pricing: {
            input: formatPrice("-1"),
            output: formatPrice("-1"),
          },
          isFree: freeModels.has(model.id),
        });
      }
      return acc;
    }, []);
  } catch (error) {
    console.error("Failed to fetch AIML models:", error);
    return [];
  }
};

const fetchVercelModels = async (): Promise<Model[]> => {
  try {
    const { models } = await aiGateway.getAvailableModels();

    return models.reduce<Model[]>((acc, model) => {
      if (model.modelType === "language") {
        acc.push({
          id: `vercel:${model.id}`,
          name: model.name,
          provider: model.id.split("/")[0].trim(),
          gateway: "vercel",
          pricing: {
            input: formatPrice(model.pricing?.input || "-1"),
            output: formatPrice(model.pricing?.output || "-1"),
          },
          context: "-",
          isFree: freeModels.has(model.id),
        });
      }
      return acc;
    }, []);
  } catch (error) {
    console.error("Failed to fetch Vercel models:", error);
    return [];
  }
};

export const GET = async () => {
  try {
    const [openRouterModels, aimlModels, vercelModels] =
      await Promise.allSettled([
        fetchOpenRouterModels(),
        fetchAIMLModels(),
        fetchVercelModels(),
      ]);

    const allModels: Model[] = [
      ...(openRouterModels.status === "fulfilled"
        ? openRouterModels.value
        : []),
      ...(aimlModels.status === "fulfilled" ? aimlModels.value : []),
      ...(vercelModels.status === "fulfilled" ? vercelModels.value : []),
    ];
    console.log("Total models:", allModels.length);

    return NextResponse.json({ models: allModels });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch available models",
      },
      { status: 500 },
    );
  }
};
