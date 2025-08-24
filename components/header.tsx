import { GitHubLink } from "./github-link";
import { ModelSelector } from "./model-selector";
import { ThemeSwitcher } from "./theme-switcher";

export const Header = () => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-end gap-2 border-b">
      <div className="flex items-center gap-2 px-4">
        <ModelSelector />
        <ThemeSwitcher />
        <GitHubLink />
      </div>
    </header>
  );
};
