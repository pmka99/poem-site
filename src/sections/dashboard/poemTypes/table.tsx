"use client"

import { Dispatch, SetStateAction, useState } from "react"
import DashboardFiltersPoems from "./filters"
import { GridColDef } from "@mui/x-data-grid";
import { TDashboardFiltersPoemTypes } from ".";
import { LayoutPoemTypeLabels } from "@/labels/poemType";
import { LayoutPoemType } from "@/enum/poemType";
import { AppDataGrid, createActionsColumn, useDataGrid } from "@/components/datagrid";

type Props = {
    filters: TDashboardFiltersPoemTypes,
}


export default function DashboardPeomTypesTable({ filters }: Props) {

    const grid = useDataGrid({ mode: "client" });

    const columns: GridColDef[] = [
        { field: "name", headerName: "نام", flex: 1 },
        { field: "description", headerName: "توضیحات", flex: 1 },
        { field: "layoutText", headerName: "چیدمان", flex: 1 },

        createActionsColumn({
            onEdit: (row) => {

            },
            onDelete: (row) => {

            },
        })

    ];

    const rows = [
        { name: "غزل", description: "", layout: LayoutPoemType.COUPLET, layoutText: LayoutPoemTypeLabels["couplet"], _id: 1 }
    ];

    let filteredRows = rows
    if (filters.layout.length > 0) {
        filteredRows = rows.filter(item => filters.layout.includes(item.layout))
    }

    return (
        <AppDataGrid
            grid={grid}
            rows={filteredRows}
            columns={columns}
        />
    )
}