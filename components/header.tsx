import Link from "next/link";
import { ConfigDialog } from "./api-key-configuration/config-dialog";
import { GitHubLink } from "./github-link";
import { ModelSelector } from "./model-selection/model-selector";
import { Profile } from "./profile";
import { ThemeSwitcher } from "./theme-switcher";
import Icons from "./ui/icons";

export const Header = () => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b border-gray-300 dark:border-gray-700">
      <Link href="/">
        <div className="flex items-center gap-2 px-4">
          <Icons.logo className="size-6" />
          <span className="sm:block hidden text-lg font-bold">Open Fiesta</span>
        </div>
      </Link>
      <div className="flex items-center gap-2 px-4">
        <ConfigDialog />
        <ModelSelector />
        <ThemeSwitcher />
        <GitHubLink />
        <Profile />
      </div>
    </header>
  );
};
