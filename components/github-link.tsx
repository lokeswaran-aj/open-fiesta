"use client";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Icons from "@/components/ui/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { siteConfig } from "@/lib/config";

export const GitHubLink = () => {
  return (
    <Button asChild size="sm" variant="ghost" className="h-8 shadow-none">
      <Link href={siteConfig.links.github} target="_blank">
        <Icons.github className="size-5" />
        <Suspense fallback={<Skeleton className="size-4" />}>
          <StarsCount />
        </Suspense>
      </Link>
    </Button>
  );
};

const StarsCount = () => {
  const [starsCount, setStarsCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchStarsCount = async () => {
      setIsLoading(true);
      const data = await fetch(siteConfig.links.githubApi, {
        next: { revalidate: 3600 }, // 1 hour
      });
      const json = await data.json();
      setStarsCount(json.stargazers_count);
      setIsLoading(false);
    };
    fetchStarsCount();
  }, []);

  return (
    <span className="text-foreground text-sm tabular-nums">
      {isLoading ? (
        <Skeleton className="size-4" />
      ) : starsCount >= 1000 ? (
        `${(starsCount / 1000).toFixed(1)}k`
      ) : (
        starsCount.toLocaleString()
      )}
    </span>
  );
};
