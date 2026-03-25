import { HemistichResponse } from "@/shared/types/hemistich.type"
import { useHemistichController } from "../hooks/logic/useHemistichController";

export type SelectedHemistichRange = {
    first?: HemistichResponse;
    last?: HemistichResponse;
} | null;


export type HemistichContextType =
    ReturnType<typeof useHemistichController>;