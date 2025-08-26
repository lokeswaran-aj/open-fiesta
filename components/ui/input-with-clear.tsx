import { X } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "./input";

interface InputWithClearProps extends React.ComponentProps<"input"> {
  onClear?: () => void;
}

const InputWithClear = React.forwardRef<HTMLInputElement, InputWithClearProps>(
  ({ className, onClear, value, defaultValue, onChange, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState(
      value || defaultValue || "",
    );

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : inputValue;

    React.useEffect(() => {
      if (isControlled) {
        setInputValue(value || "");
      }
    }, [value, isControlled]);

    const handleClear = () => {
      if (!isControlled) {
        setInputValue("");
      }
      if (onClear) {
        onClear();
      }
      // Trigger onChange event to notify parent component
      if (onChange) {
        const event = {
          target: { value: "" },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(event);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInputValue(e.target.value);
      }
      if (onChange) {
        onChange(e);
      }
    };

    const showClearButton = currentValue && String(currentValue).length > 0;

    return (
      <div className="relative">
        <Input
          ref={ref}
          value={currentValue}
          className={cn("pr-8", className)}
          onChange={handleChange}
          {...props}
        />
        {showClearButton && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            tabIndex={-1}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  },
);

InputWithClear.displayName = "InputWithClear";

export { InputWithClear };
