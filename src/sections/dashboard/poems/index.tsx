"use client"

import { useState } from "react"
import DashboardFiltersPoems from "./filters"

export type TDashboardFiltersPoems = {
    search: string
    poemType: string
}

export default function DashboardPeomsView() {

    const [filters, setFilters] = useState<TDashboardFiltersPoems>({
        search: "",
        poemType: "",
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