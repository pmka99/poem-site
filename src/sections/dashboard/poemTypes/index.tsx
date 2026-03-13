"use client"

import { useState } from "react"
import DashboardFiltersPoems from "./filters"

export type TDashboardFiltersPoemTypes = {
    search: string
    poemType: string[]
}

export default function DashboardPeomTypesView() {

    const [filters, setFilters] = useState<TDashboardFiltersPoemTypes>({
        search: "",
        poemType: [],
    })

    return (
        <div className="flex flex-col">
            {/** filters */}
            <DashboardFiltersPoems filters={filters} setFilters={setFilters} />

            {/** table */}
            

            {/** modals */}
        </div>
    )
}