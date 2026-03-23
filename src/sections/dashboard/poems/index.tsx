"use client"

import { useState } from "react"
import DashboardPoemsFilters from "./filters"
import DashboardPoemsTable from "./table"

export type TDashboardPoemsFilters = {
    search: string
    poemType: string
}

export default function DashboardPeomsView() {

    const [filters, setFilters] = useState<TDashboardPoemsFilters>({
        search: "",
        poemType: "",
    })

    return (
        <div className="flex flex-col">
            <DashboardPoemsFilters filters={filters} setFilters={setFilters} />
            <DashboardPoemsTable filters={filters} />
        </div>
    )
}