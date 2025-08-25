import { gateway } from "@ai-sdk/gateway";
import millify from "millify";
import { NextResponse } from "next/server";
import type { AIMLModel, Model } from "@/lib/types";

export const GET = async (request: Request) => {
  const url = new URL(request.url);
  const provider = url.searchParams.get("provider");

  if (provider === "aiml") {
    const response = await fetch("https://api.aimlapi.com/models", {
      next: { revalidate: 3600 },
    });
    const data: AIMLModel[] = (await response.json()).data;

    const aimlModels: Model[] = data.reduce<Model[]>((acc, model) => {
      if (model.type === "chat-completion") {
        acc.push({
          id: model.id,
          name: model.info.name,
          provider: model.info.developer,
          context: millify(model.info.contextLength),
        });
      }
      return acc;
    }, []);

    return NextResponse.json({ models: aimlModels });
  }

  try {
    const { models } = await gateway.getAvailableModels();
    const languageModels = models.filter(
      (model) => model.modelType === "language",
    );

    return NextResponse.json({ models: languageModels });
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
