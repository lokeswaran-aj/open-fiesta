"use server";

import type { Model } from "@/lib/types";

export const fetchModels = async (
  provider: string = "aiml",
  revalidateSeconds: number = 3600,
): Promise<{ models: Model[]; error?: string }> => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/models?provider=${provider}`, {
      next: { revalidate: revalidateSeconds },
    });

    const data = await res.json();

    if (res.ok) {
      return { models: data.models };
    } else {
      return { models: [], error: data.error };
    }
  } catch (error) {
    console.error("Failed to fetch models:", error);
    return { models: [], error: "Failed to fetch models" };
  }
};
