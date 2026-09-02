"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => undefined;

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const isDark = mounted && resolvedTheme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="group grid size-10 shrink-0 cursor-pointer place-items-center border border-foreground bg-background text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      aria-label={label}
      title={label}
    >
      <span className="sr-only">{label}</span>
      {mounted ? (
        isDark ? (
          <Sun aria-hidden="true" className="size-4" strokeWidth={1.6} />
        ) : (
          <Moon aria-hidden="true" className="size-4" strokeWidth={1.6} />
        )
      ) : (
        <span aria-hidden="true" className="size-4 border border-current" />
      )}
    </button>
  );
}
