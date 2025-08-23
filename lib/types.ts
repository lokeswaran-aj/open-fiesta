export type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
};
