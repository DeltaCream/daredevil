"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";
import { useEffect } from "react";
import { initColorAndAccent } from "./color-manager";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // restore persisted shadcn theme and accent classes on client mount
  useEffect(() => {
    initColorAndAccent();
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
