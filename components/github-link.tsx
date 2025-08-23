import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/lib/config";

export const GitHubLink = () => {
  return (
    <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
      <Link href={siteConfig.links.github} target="_blank">
        <Icons.github className="size-5" />
        <React.Suspense fallback={<Skeleton className="size-4" />}>
          <StarsCount />
        </React.Suspense>
      </Link>
    </Button>
  );
};

const StarsCount = async () => {
  const data = await fetch(siteConfig.links.githubApi, {
    next: { revalidate: 3600 }, // 1 hour
  });
  const json = await data.json();

  return (
    <span className="text-foreground text-sm tabular-nums">
      {json.stargazers_count >= 1000
        ? `${(json.stargazers_count / 1000).toFixed(1)}k`
        : json.stargazers_count.toLocaleString()}
    </span>
  );
};
