import { gateway } from "@ai-sdk/gateway";
import { NextResponse } from "next/server";

export const GET = async () => {
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
