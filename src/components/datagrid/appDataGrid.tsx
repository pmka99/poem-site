"use client";

import * as React from "react";
import {
    DataGrid,
    DataGridProps,
} from "@mui/x-data-grid";

import {
    GridSearchToolbar,
} from "./toolbar/gridSearchToolbar";

type AppDataGridProps = Omit<DataGridProps, "slots" | "slotProps"> & {
    grid: {
        mode: "server" | "client";
        query: {
            search?: string;
        };
        paginationModel: any;
        sortModel: any;
        setPaginationModel: any;
        setSortModel: any;
        setSearch: (value: string) => void;
    };
};


export function AppDataGrid({
    grid,
    ...props
}: AppDataGridProps) {
    return (
        <DataGrid
            {...props}
            paginationModel={grid.paginationModel}
            onPaginationModelChange={grid.setPaginationModel}
            sortModel={grid.sortModel}
            onSortModelChange={grid.setSortModel}
            paginationMode={grid.mode}
            sortingMode={grid.mode}
            slots={{ toolbar: GridSearchToolbar }}
            slotProps={{
                toolbar: {
                    value: grid.query.search,
                    onSearchChange: grid.setSearch,
                },
            }}
            getRowId={(row) => row._id ?? row.id}
        />

    );
}
