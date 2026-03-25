"use client";

import { createContext, useContext, useState } from "react";

export type ReadType = "infinit-scroll" | "pagination";

type ContextType = {
    readType: ReadType;
    toggleReadType: () => void;
};

export const ReadTypeContext = createContext<ContextType | null>(null);
