import Link from "next/link";
import { siteConfig } from "@/lib/config";

export const Footer = () => {
  return (
    <div className="flex gap-2 text-sm flex-wrap items-center justify-center">
      <p>
        Built with ❤️ by{" "}
        <Link
          href="https://lokeswaran.dev"
          className="underline underline-offset-4"
          target="_blank"
        >
          Lokeswaran Aruljothy
        </Link>
      </p>
      <p>•</p>
      <Link
        href={siteConfig.links.github}
        className="underline underline-offset-4"
        target="_blank"
      >
        View on GitHub
      </Link>
    </div>
  );
};
