"use client";

import { useModal } from "@/hooks";
import { MODALS } from "@/types/modals";

import { poemTypeHooks } from "@/api/hooks/poemType.hooks";

import { PoemTypeResponse } from "@/shared/types/poemType.type";
import { LayoutPoemTypeLabels } from "@/labels/poemType";

import {
    AppDataGrid,
    createActionsColumn,
    useDataGrid,
} from "@/components/datagrid";

import { GridColDef } from "@mui/x-data-grid";

import DashboardPoemTypeAddModal from "./modals/add";

import { TDashboardFiltersPoemTypes } from ".";
import { LayoutPoemType } from "@/enum/poemType";
import ShowModals from "./modals";

type Props = { filters: TDashboardFiltersPoemTypes };

export default function DashboardPoemTypesTable({ filters }: Props) {
    const { openModal } = useModal();

    const grid = useDataGrid({ mode: "client" });

    const { data, isLoading } = poemTypeHooks.useList();

    const rows = data?.data ?? [];

    const filteredRows =
        filters.layout.length > 0
            ? rows.filter((r) => filters.layout.includes(r.layout))
            : rows;

    const columns: GridColDef<PoemTypeResponse>[] = [
        { field: "name", headerName: "نام", flex: 1 },

        { field: "description", headerName: "توضیحات", flex: 1 },

        {
            field: "layout",
            headerName: "چیدمان",
            flex: 1,
            renderCell: (params) =>
                LayoutPoemTypeLabels[params.value as LayoutPoemType],
        },

        createActionsColumn<PoemTypeResponse>({
            onEdit: (row) => { openModal(MODALS.EDIT_POEMTYPE, { poemTypeId:row._id}) },
            onDelete: (row) => { },
        }),
    ];

    return (
        <>
            <AppDataGrid
                grid={grid}
                rows={filteredRows}
                columns={columns}
                loading={isLoading}
                onAddClick={() => openModal(MODALS.ADD_POEMTYPE)}
            />

            <ShowModals />
        </>
    );
}
