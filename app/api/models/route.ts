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

export const GET = async (request: Request) => {
  try {
    const url = new URL(request.url);
    const gateway = url.searchParams.get("gateway");

    if (gateway === "openrouter") {
      const response = await fetch("https://openrouter.ai/api/v1/models", {
        next: { revalidate: 3600 },
      });
      const data: OpenRouterModel[] = (await response.json()).data;
      const openRouterModels: Model[] = data.reduce<Model[]>((acc, model) => {
        const provider = model.id.split("/")[0].trim().replace("-", "");
        acc.push({
          id: model.id,
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

      return NextResponse.json({ models: openRouterModels });
    } else if (gateway === "aimlapi") {
      const response = await fetch("https://api.aimlapi.com/models", {
        next: { revalidate: 3600 },
      });
      const data: AIMLModel[] = (await response.json()).data;

      const aimlModels: Model[] = data.reduce<Model[]>((acc, model) => {
        if (model.type === "chat-completion") {
          acc.push({
            id: model.id,
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

      return NextResponse.json({ models: aimlModels });
    } else if (gateway === "vercel") {
      const { models } = await aiGateway.getAvailableModels();
      const vercelModels: Model[] = models.reduce<Model[]>((acc, model) => {
        if (model.modelType === "language") {
          acc.push({
            id: model.id,
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

      return NextResponse.json({ models: vercelModels });
    } else {
      throw new Error("Invalid gateway");
    }
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
