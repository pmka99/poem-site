"use client";

import { useMemo } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createRtlCache from "./createRtlCache";

const cacheRtl = createRtlCache();

export default function MuiProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const theme = useMemo(() =>
        createTheme({
            direction: "rtl",

            palette: {
                mode: "light",

                primary: {
                    main: "#c89b6d",
                },

                secondary: {
                    main: "#1f2937",
                },

                background: {
                    default: "#ffffff",
                },

                text: {
                    primary: "#111827",
                },
            },

            typography: {
                fontFamily: "var(--font-naskh)",
            },
        }),
        []);

    return (
        <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
}