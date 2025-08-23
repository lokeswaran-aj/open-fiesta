"use client";

import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "./ui/button";
import Icons from "./ui/icons";

export const ThemeSwitcher = () => {
  const { setTheme } = useTheme();

  const toggleTheme = React.useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, [setTheme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="group/toggle extend-touch-target size-8 h-8 shadow-none"
      onClick={toggleTheme}
      title="Toggle theme"
    >
      <Icons.themeChanger className="size-5" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
