"use client"

import { useEffect, useState } from "react"

export type ViewMode = "pagination" | "infinite"

const STORAGE_KEY = "hemistich-view-mode"

export function useViewMode() {

    const [mode, setMode] = useState<ViewMode>("pagination")

    useEffect(() => {
        const saved = localStorage.getItem(STORAGE_KEY)

        if (saved === "pagination" || saved === "infinite") {
            setMode(saved)
        }
    }, [])

    const changeMode = (newMode: ViewMode) => {
        setMode(newMode)
        localStorage.setItem(STORAGE_KEY, newMode)
    }

    return { mode, setMode: changeMode }
}
