"use client"

import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { ViewMode } from "@/hooks/useViewMode"

type Props = {
    mode: ViewMode
    onChange: (mode: ViewMode) => void
}

export default function ViewModeSwitcher({ mode, onChange }: Props) {

    const handleChange = (_: React.SyntheticEvent, newValue: ViewMode) => {
        onChange(newValue)
    }

    return (
        <Tabs
            value={mode}
            onChange={handleChange}
            sx={{ mb: 3 }}
        >
            <Tab value="pagination" label="چند صفحه" />
            <Tab value="infinite" label="تک صفحه" />
        </Tabs>
    )
}
