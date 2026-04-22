"use client";

import { ReadType, ReaderSettingContext, TFontSize, TFontStyle } from "@/contexts/readerSettingContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ReaderSettingProvider({
    children,
    initialReadType,
    initialFontSize = "medium",
    initialFontStyle = "naskh",
}: {
    children: React.ReactNode;
    initialReadType: ReadType;
    initialFontSize?: TFontSize;
    initialFontStyle?: TFontStyle;
}) {
    const router = useRouter();

    // State ها
    const [readType, setReadType] = useState<ReadType>(initialReadType);
    const [fontSize, setFontSizeState] = useState<TFontSize>(initialFontSize);
    const [fontStyle, setFontStyleState] = useState<TFontStyle>(initialFontStyle);

    // تغییر حالت infinite-scroll <-> pagination
    const toggleReadType = () => {
        const newType =
            readType === "infinit-scroll" ? "pagination" : "infinit-scroll";

        setReadType(newType);

        localStorage.setItem("read-type", newType);
        document.cookie = `read-type=${newType}; path=/`;
        router.refresh();
    };

    // تغییر اندازه فونت
    const setFontSize = (size: TFontSize) => {
        setFontSizeState(size);

        localStorage.setItem("font-size", size);
        document.cookie = `font-size=${size}; path=/`;
        router.refresh();
    };

    // تغییر نوع فونت
    const setFontStyle = (style: TFontStyle) => {
        setFontStyleState(style);

        localStorage.setItem("font-style", style);
        document.cookie = `font-style=${style}; path=/`;
        router.refresh();
    };

    return (
        <ReaderSettingContext.Provider
            value={{
                readType,
                fontSize,
                fontStyle,
                toggleReadType,
                setFontSize,
                setFontStyle,
            }}
        >
            {children}
        </ReaderSettingContext.Provider>
    );
}
