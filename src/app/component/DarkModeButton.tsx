"use client";

import { useTheme } from "next-themes";

export default function DarkModeButton() {

  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="rounded-xl bg-slate-800 px-4 py-2 text-white"
    >
      {theme === "dark"
        ? "Light Mode"
        : "Dark Mode"}
    </button>
  );
}