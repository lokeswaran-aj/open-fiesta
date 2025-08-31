import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { MessageAction } from "@/components/prompt-kit/message";
import { Button } from "@/components/ui/button";

type Props = {
  text: string;
};

export const CopyAction = ({ text }: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <MessageAction
      tooltip={isCopied ? "Copied" : "Copy"}
      side="bottom"
      delayDuration={1000}
    >
      <Button
        variant="ghost"
        size="icon"
        className="rounded-full"
        onClick={() => {
          navigator.clipboard.writeText(text);
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 2000);
        }}
      >
        {isCopied ? <Check /> : <Copy />}
      </Button>
    </MessageAction>
  );
};
