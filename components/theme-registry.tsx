"use client";

import { ReactNode } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import { EmotionCacheProvider } from "@/components/emotion-cache-provider";
import { theme } from "@/styles/theme";

export const ThemeRegistry = ({ children }: { children: ReactNode }) => {
  return (
    <EmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </EmotionCacheProvider>
  );
};
