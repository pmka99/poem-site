"use client";

import React from "react";

export default function ReadTypeToggleButton() {
    const [readType, setReadType] = React.useState<"infinit-scroll" | "pagination">("infinit-scroll");
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);

        const stored = localStorage.getItem("read-type") as
            | "infinit-scroll"
            | "pagination"
            | null;

        if (stored) {
            setReadType(stored);
        }
    }, []);

    const toggleReadType = () => {
        setReadType(prev => {
            const newType =
                prev === "infinit-scroll" ? "pagination" : "infinit-scroll";

            localStorage.setItem("read-type", newType);
            return newType;
        });
    };

    if (!mounted) return null; // جلوگیری از mismatch

    return (
        <button
            className="bg-primary text-foreground border-border p-5 rounded-sm
      cursor-pointer hover:bg-secondary hover:text-secondary-foreground"
            onClick={toggleReadType}
        >
            {readType === "infinit-scroll"
                ? "تغییر به نمایش به صورت چند صفحه ای"
                : "تغییر به نمایش به صورت تمام صفحه ای"}
        </button>
    );
}