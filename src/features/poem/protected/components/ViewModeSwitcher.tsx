"use client"

import { ViewMode } from "@/hooks/useViewMode"

type Props = {
    mode: ViewMode
    onChange: (mode: ViewMode) => void
}

export default function ViewModeSwitcher({
    mode,
    onChange
}: Props) {

    return (

        <div className="flex gap-3 mb-6">

            <button
                onClick={() => onChange("pagination")}
                className={mode === "pagination" ? "font-bold" : ""}
            >
                چند صفحه
            </button>

            <button
                onClick={() => onChange("infinite")}
                className={mode === "infinite" ? "font-bold" : ""}
            >
                تک صفحه
            </button>

        </div>

    )
}
