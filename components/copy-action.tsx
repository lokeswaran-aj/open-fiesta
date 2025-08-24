import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { MessageAction } from "./prompt-kit/message";
import { Button } from "./ui/button";

type Props = { text: string };

export const CopyAction = (props: Props) => {
  const { text } = props;
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <MessageAction tooltip="Copy" side="bottom">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={handleCopy}
      >
        {copied ? (
          <Check className="size-4 text-green-500" />
        ) : (
          <Copy className="size-4" />
        )}
      </Button>
    </MessageAction>
  );
};
