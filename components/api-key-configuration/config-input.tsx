import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { InputWithClear } from "@/components/ui/input-with-clear";
import { Label } from "@/components/ui/label";

type Props = {
  id: string;
  name: string;
  placeholder: string;
  label: string;
  appHref: string;
  appTitle: string;
  getApiKeyHref: string;
  value: string;
  onChange: (value: string) => void;
};

export const ConfigInput = (props: Props) => {
  const {
    id,
    name,
    placeholder,
    appHref,
    appTitle,
    getApiKeyHref,
    value,
    onChange,
  } = props;
  return (
    <div className="grid gap-3">
      <div className="flex items-end justify-between">
        <Label htmlFor={id}>
          <Link
            href={appHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4"
          >
            {appTitle}
          </Link>
        </Label>
        <a
          href={getApiKeyHref}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-3 flex items-center gap-1 text-muted-foreground text-xs"
        >
          Get API Key
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
      <InputWithClear
        id={id}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onClear={() => {
          onChange("");
        }}
      />
    </div>
  );
};
