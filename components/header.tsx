import { SidebarTrigger } from "@/components/ui/sidebar";
import { ConfigDialog } from "./api-key-configuration/config-dialog";
import { GitHubLink } from "./github-link";
import { ModelSelector } from "./model-selection/model-selector";
import { ThemeSwitcher } from "./theme-switcher";

export const Header = () => {
  return (
    <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear border-b border-gray-300 dark:border-gray-700">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
      </div>
      <div className="flex justify-end items-center gap-2 px-4">
        <ConfigDialog />
        <ModelSelector />
        <ThemeSwitcher />
        <GitHubLink />
      </div>
    </header>
  );
};
