import { PlusIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ActionButtonProps = {
  type: "add" | "remove";
  size?: "sm" | "md";
  onClick: () => void;
  disabled?: boolean;
  tooltipText: string;
};

export const ActionButton = ({
  type,
  size = "md",
  onClick,
  disabled = false,
  tooltipText,
}: ActionButtonProps) => {
  const Icon = type === "add" ? PlusIcon : X;
  const backgroundColor = type === "add" ? "#16a34a" : "#dc2626";
  const buttonSize = size === "sm" ? "w-5 h-5" : "w-6 h-6";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className={`${buttonSize} rounded-full p-0 flex items-center justify-center border-none`}
          onClick={onClick}
          disabled={disabled}
          style={{
            backgroundColor,
            color: "white",
            border: "none",
          }}
        >
          <Icon className="size-3" strokeWidth={3.5} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltipText}</p>
      </TooltipContent>
    </Tooltip>
  );
};
