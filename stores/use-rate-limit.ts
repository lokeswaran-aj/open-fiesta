import prettyMilliseconds from "pretty-ms";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RateLimitState {
  imageGenerationCount: number;
  firstGenerationTime: number | null;
  canGenerateImage: () => boolean;
  incrementImageGeneration: () => void;
  checkAndResetIfExpired: () => void;
  getNextAvailableTime: () => string | null;
}

const DAILY_LIMIT = 10;

export const useRateLimit = create<RateLimitState>()(
  persist(
    (set, get) => ({
      imageGenerationCount: 0,
      firstGenerationTime: null,

      canGenerateImage: () => {
        const state = get();
        state.checkAndResetIfExpired();
        return state.imageGenerationCount < DAILY_LIMIT;
      },

      incrementImageGeneration: () => {
        const state = get();
        state.checkAndResetIfExpired();
        if (state.imageGenerationCount < DAILY_LIMIT) {
          const now = Date.now();
          set({
            imageGenerationCount: state.imageGenerationCount + 1,
            firstGenerationTime: state.firstGenerationTime || now,
          });
        }
      },

      checkAndResetIfExpired: () => {
        const state = get();
        if (state.firstGenerationTime) {
          const now = Date.now();
          const timeElapsed = now - state.firstGenerationTime;
          const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

          if (timeElapsed >= twentyFourHours) {
            set({
              imageGenerationCount: 0,
              firstGenerationTime: null,
            });
          }
        }
      },

      getNextAvailableTime: () => {
        const state = get();
        if (
          !state.firstGenerationTime ||
          state.imageGenerationCount < DAILY_LIMIT
        ) {
          return null;
        }

        const nextAvailable = state.firstGenerationTime + 24 * 60 * 60 * 1000;
        const now = Date.now();
        const timeRemaining = nextAvailable - now;

        if (timeRemaining <= 0) {
          return null;
        }

        return prettyMilliseconds(timeRemaining, { compact: true });
      },
    }),
    {
      name: "image-rate-limit",
      version: 1,
    },
  ),
);
