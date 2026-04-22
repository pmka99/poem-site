import { ReaderSettingContext } from "@/contexts/readerSettingContext";
import { useContext } from "react";

export function useReaderSetting() {
    const ctx = useContext(ReaderSettingContext);
    if (!ctx) throw new Error("useReaderSetting must be used inside provider");
    return ctx;
}
