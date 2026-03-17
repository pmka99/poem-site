"use client"

import { useState } from "react"
import DashboardPoemTypesFilters from "./filters"
import { LayoutPoemType } from "@/enum/poemType";
import DashboardPeomTypesTable from "./table";

export type TDashboardFiltersPoemTypes = {
    search: string
    layout: LayoutPoemType[]
}


export default function DashboardPeomTypesView() {

    const [filters, setFilters] = useState<TDashboardFiltersPoemTypes>({
        search: "",
        layout: [],
    })

    return (
        <div className="flex flex-col">
            <DashboardPoemTypesFilters filters={filters} setFilters={setFilters} />
            <DashboardPeomTypesTable filters={filters} />
        </div>
    )
}