import { HemistichResponse } from "@/shared/types/hemistich.type"

export type SelectedHemistichRange = {
    first?: HemistichResponse | null,
    last?: HemistichResponse | null
} | null