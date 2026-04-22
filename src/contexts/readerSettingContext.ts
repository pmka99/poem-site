"use client";

import { createContext, useContext, useState } from "react";

export type ReadType = "infinit-scroll" | "pagination";
export type TFontSize = "small" | "medium" | "large";
export type TFontStyle = "nastaliq" | "naskh";

type ContextType = {
    fontStyle: TFontStyle;
    fontSize: TFontSize;
    readType: ReadType;
    toggleReadType: () => void;
    setFontSize: (size: TFontSize) => void;
    setFontStyle: (style: TFontStyle) => void;
};

export const ReaderSettingContext = createContext<ContextType | null>(null);
