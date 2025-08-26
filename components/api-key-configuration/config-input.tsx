import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  id: string;
  name: string;
  placeholder: string;
  label: string;
  appHref: string;
  appTitle: string;
  getApiKeyHref: string;
  defaultValue: string;
};

export const ConfigInput = ({
  id,
  name,
  placeholder,
  appHref,
  appTitle,
  getApiKeyHref,
  defaultValue,
}: Props) => {
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
          className="hover:underline underline-offset-4 flex items-center gap-1 text-muted-foreground text-sm"
        >
          Get API Key
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
      <Input
        id={id}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
      />
    </div>
  );
};
