"use client";

import { useEffect, useMemo, useState } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createRtlCache from "./createRtlCache";
import { getCssVar } from "./getCssVar";

const cacheRtl = createRtlCache();

export default function MuiProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const defaultThemeMode = localStorage.getItem("theme") as ("light" | "dark")
    const [mode, setMode] = useState<"light" | "dark">(defaultThemeMode ?? "light");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const updateMode = () => {
            setMode(
                defaultThemeMode === "dark"
                    ? "dark"
                    : "light"
            );
        };

        updateMode();

        const observer = new MutationObserver(updateMode);

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["data-theme"],
        });

        return () => observer.disconnect();
    }, []);

    const theme = useMemo(() => {
        if (!mounted) return createTheme();

        return createTheme({
            direction: "rtl",

            palette: {
                mode,

                primary: {
                    main: getCssVar("--primary"),
                },

                secondary: {
                    main: getCssVar("--secondary"),
                },

                background: {
                    default: getCssVar("--background"),
                },

                text: {
                    primary: getCssVar("--foreground"),
                },
            },

            typography: {
                fontFamily: "var(--font-naskh)",
            },
        }, { mode });
    }, [mode, mounted]);

    if (!mounted) return null;

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
}