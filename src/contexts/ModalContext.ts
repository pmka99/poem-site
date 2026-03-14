"use client";

import { createContext, useContext, useState } from "react";
import type { ModalName } from "@/types/modals";

export type ModalState = Partial<Record<ModalName, boolean>>;

export type ModalContextType = {
    modals: ModalState;
    openModal: (name: ModalName) => void;
    closeModal: (name: ModalName) => void;
};

export const ModalContext = createContext<ModalContextType | null>(null);


