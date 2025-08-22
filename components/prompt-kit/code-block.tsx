"use client";

import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import type React from "react";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type CodeBlockProps = {
  children?: React.ReactNode;
  className?: string;
} & React.HTMLProps<HTMLDivElement>;

function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  return (
    <div
      className={cn(
        "not-prose flex w-full flex-col overflow-clip border",
        "border-border bg-card text-card-foreground rounded-xl relative group",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-md transition-all duration-200",
            "bg-muted/50 hover:bg-muted border border-border/50 hover:border-border",
            "opacity-0 group-hover:opacity-100 focus:opacity-100",
            "flex items-center justify-center text-muted-foreground hover:text-foreground",
          )}
        >
          {copied ? (
            <Check className="text-green-500" size={16} />
          ) : (
            <Copy size={16} />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{copied ? "Copied to clipboard!" : "Copy to clipboard"}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export type CodeBlockCodeProps = {
  code: string;
  language?: string;
  theme?: string;
  className?: string;
} & React.HTMLProps<HTMLDivElement>;

function CodeBlockCode({
  code,
  language = "tsx",
  theme,
  className,
  ...props
}: CodeBlockCodeProps) {
  const { resolvedTheme } = useTheme();
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);

  // Choose theme based on current theme
  const shikiTheme =
    theme ||
    (resolvedTheme === "dark" ? "github-dark-default" : "github-light-default");

  useEffect(() => {
    async function highlight() {
      if (!code) {
        setHighlightedHtml("<pre><code></code></pre>");
        return;
      }

      const html = await codeToHtml(code, {
        lang: language,
        theme: shikiTheme,
      });
      setHighlightedHtml(html);
    }
    highlight();
  }, [code, language, shikiTheme]);

  const classNames = cn(
    "w-full overflow-x-auto text-[13px] code-block-content",
    "[&>pre]:px-4 [&>pre]:py-4 [&>pre]:!bg-transparent",
    "[&_pre]:!bg-transparent [&_code]:!bg-transparent",
    className,
  );

  // SSR fallback: render plain code if not hydrated yet
  return (
    <div className="relative">
      <CopyButton code={code} />
      {highlightedHtml ? (
        <div
          className={classNames}
          // biome-ignore lint/security/noDangerouslySetInnerHtml: we're using shiki to highlight the code
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          {...props}
        />
      ) : (
        <div className={classNames} {...props}>
          <pre className="!bg-transparent">
            <code className="!bg-transparent">{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

export type CodeBlockGroupProps = React.HTMLAttributes<HTMLDivElement>;

function CodeBlockGroup({
  children,
  className,
  ...props
}: CodeBlockGroupProps) {
  return (
    <div
      className={cn("flex items-center justify-between", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { CodeBlockGroup, CodeBlockCode, CodeBlock };
