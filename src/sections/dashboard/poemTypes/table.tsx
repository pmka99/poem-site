"use client";

import { useConfirm, useModal } from "@/hooks";
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

import { TDashboardFiltersPoemTypes } from ".";
import { LayoutPoemType } from "@/enum/poemType";
import ShowModals from "./actions";

type Props = { filters: TDashboardFiltersPoemTypes };

export default function DashboardPoemTypesTable({ filters }: Props) {
    const { openModal } = useModal();
    const confirm = useConfirm();

    const grid = useDataGrid({ mode: "client" });

    const { data, isLoading } = poemTypeHooks.useList();

    const deleteMutation = poemTypeHooks.useDelete();

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
            onEdit: (row) => { openModal(MODALS.EDIT_POEMTYPE, { poemTypeId: row._id }) },
            onDelete: async (row) => {
                const ok = await confirm("آیا از حذف این نوع شعر مطمئن هستید؟");

                if (!ok) return;

                deleteMutation.mutate(row._id);
            },
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
