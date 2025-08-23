import { ChatInput } from "./chat-input";
import { Conversation } from "./conversation";
import { Footer } from "./footer";

export const Chat = () => {
  return (
    <>
      <Conversation />
      <ChatInput />
      <Footer />
    </>
  );
};
