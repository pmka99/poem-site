"use client";

import * as React from "react";
import { DataGrid, DataGridProps } from "@mui/x-data-grid";
import { MdAdd, MdFileDownload, MdRefresh } from "react-icons/md";

import {
    GridSearchToolbar,
    GridSearchToolbarProps,
} from "./toolbar/gridToolbar";

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
    onAddClick?: () => void;
    onExportClick?: () => void;
    onRefreshClick?: () => void;
};

export function AppDataGrid({
    grid,
    onAddClick,
    onExportClick,
    onRefreshClick,
    ...props
}: AppDataGridProps) {
    
    const actions = React.useMemo(() => {
        const arr: GridSearchToolbarProps["actions"] = [];
        if (onAddClick)
            arr.push({
                label: "افزودن",
                icon: <MdAdd />,
                onClick: onAddClick,
            });
        if (onExportClick)
            arr.push({
                label: "خروجی",
                icon: <MdFileDownload />,
                onClick: onExportClick,
                variant: "outlined",
            });
        if (onRefreshClick)
            arr.push({
                label: "تازه‌سازی",
                icon: <MdRefresh />,
                onClick: onRefreshClick,
                variant: "outlined",
                color: "info",
            });
        return arr;
    }, [onAddClick, onExportClick, onRefreshClick]);

    const Toolbar = React.useCallback(
        (props: any) => (
            <GridSearchToolbar
                {...props}
                mode={grid.mode}
                value={grid.query.search}
                onSearchChange={grid.setSearch}
                actions={actions}
            />
        ),
        [grid.mode, grid.query.search, grid.setSearch, actions]
    );    

    return (
        <DataGrid
            {...props}
            paginationModel={grid.paginationModel}
            onPaginationModelChange={grid.setPaginationModel}
            sortModel={grid.sortModel}
            onSortModelChange={grid.setSortModel}
            paginationMode={grid.mode}
            sortingMode={grid.mode}
            showToolbar
            slots={{ toolbar: Toolbar }}
            getRowId={(row) => row._id ?? row.id}
        />
    );
}
