"use client";

import { createContext, useContext } from "react";
import { HemistichContextType } from "../types";

export const HemistichContext =
    createContext<HemistichContextType | null>(null);

export function useHemistich() {
    const context = useContext(HemistichContext);

    if (!context) {
        throw new Error("useHemistich must be used inside HemistichProvider");
    }

    return context;
}
