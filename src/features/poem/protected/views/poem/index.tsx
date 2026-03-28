"use client"

import { useState } from "react"
import DashboardPoemsFilters from "./filters"
import DashboardPoemsTable from "./table"

export type TDashboardPoemsFilters = {
    search: string
    poemType: string
}

export default function DashboardPoemsView() {

    const [filters, setFilters] = useState<TDashboardPoemsFilters>({
        search: "",
        poemType: "",
    })

    return (
        <div className="flex flex-col h-full">
            <DashboardPoemsFilters filters={filters} setFilters={setFilters} />
            <DashboardPoemsTable filters={filters} />
        </div>
    )
}