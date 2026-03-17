"use client";

import { createContext, useContext, useState } from "react";
import type { ModalName, ModalPayloadMap } from "@/types/modals";

export type ModalState = {
    [K in keyof ModalPayloadMap]?: {
        open: boolean;
        data?: ModalPayloadMap[K];
    };
};

export type ModalContextType = {
    modals: ModalState;

    openModal: <T extends keyof ModalPayloadMap>(
        name: T,
        data?: ModalPayloadMap[T]
    ) => void;

    closeModal: (name: keyof ModalPayloadMap) => void;
};



export const ModalContext = createContext<ModalContextType | null>(null);


