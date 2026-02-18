"use client";

import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

type Theme = "light" | "dark";

export default function ThemeToggleButton() {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null;

        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;

        const initialTheme = savedTheme ?? (prefersDark ? "dark" : "light");

        setTheme(initialTheme);
        document.documentElement.dataset.theme = initialTheme;
    }, []);

    const toggleTheme = () => {
        const nextTheme: Theme = theme === "light" ? "dark" : "light";

        setTheme(nextTheme);
        document.documentElement.dataset.theme = nextTheme;
        localStorage.setItem("theme", nextTheme);
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="
            cursor-pointer
            flex items-center justify-center
            w-10 h-10 rounded-full
            border border-border
            text-foreground bg-background
            transition-all duration-300
            hover:bg-muted
            active:scale-95
            "
        >
            {theme === "light" ? (
                <FiMoon className="w-5 h-5" />
            ) : (
                <FiSun className="w-5 h-5" />
            )}
        </button>
    );
}

