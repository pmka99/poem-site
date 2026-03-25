import { ReadTypeContext } from "@/contexts/readTypeContext";
import { useContext } from "react";

export function useReadType() {
    const ctx = useContext(ReadTypeContext);
    if (!ctx) throw new Error("useReadType must be used inside provider");
    return ctx;
}
