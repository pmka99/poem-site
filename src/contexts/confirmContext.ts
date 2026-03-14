import { createContext } from "react";

export type ConfirmFn = (message: string) => Promise<boolean>;

export const ConfirmContext = createContext<ConfirmFn | null>(null);
