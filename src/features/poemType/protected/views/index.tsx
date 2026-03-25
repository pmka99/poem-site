"use client"

import { useState } from "react"
import DashboardPoemTypesFilters from "./filters"
import DashboardPoemTypesTable from "./table";

export type TDashboardFiltersPoemTypes = {
    search: string
    layout: number[]
}


export default function DashboardPoemTypesView() {

    const [filters, setFilters] = useState<TDashboardFiltersPoemTypes>({
        search: "",
        layout: [],
    })

    return (
        <div className="flex flex-col">
            <DashboardPoemTypesFilters filters={filters} setFilters={setFilters} />
            <DashboardPoemTypesTable filters={filters} />
        </div>
    )
}