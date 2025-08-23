import { registerOTel } from "@vercel/otel";
import { initializeOTEL } from "langsmith/experimental/otel/setup";

const { DEFAULT_LANGSMITH_SPAN_PROCESSOR } = initializeOTEL({
  skipGlobalContextManagerSetup: true,
});

export function register() {
  registerOTel({
    serviceName: "open-fiesta",
    spanProcessors: [DEFAULT_LANGSMITH_SPAN_PROCESSOR],
  });
}
