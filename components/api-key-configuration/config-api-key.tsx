"use client";

import { KeyRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const ConfigApiKey = () => {
  return (
    <Link href="/api-key">
      <Button variant="outline" size="sm">
        <KeyRound className="w-4 h-4" />
        <span className="hidden sm:block">Config API Key</span>
      </Button>
    </Link>
  );
};
