"use client";

import { useConfirm, useModal } from "@/hooks";
import { MODALS } from "@/types/modals";

import { PoemResponse } from "@/shared/types/poem.type";

import {
    AppDataGrid,
    createActionsColumn,
    useDataGrid,
} from "@/components/datagrid";

import { GridColDef } from "@mui/x-data-grid";

import { TDashboardPoemsFilters } from ".";
import { useDeletePoem, usePoems } from "@/features/poem/protected/hooks";
import ShowModals from "./actions";
import { useRouter } from "next/navigation";

type Props = { filters: TDashboardPoemsFilters };

export default function DashboardPoemsTable({ filters }: Props) {
    const { openModal } = useModal();
    const confirm = useConfirm();

    const router = useRouter();

    const grid = useDataGrid({ mode: "server" });

    const { data, isLoading } = usePoems();

    const deleteMutation = useDeletePoem();

    const rows = data?.data ?? [];

    const columns: GridColDef<PoemResponse>[] = [
        { field: "title", headerName: "نام", flex: 1 },

        { field: "poemType", headerName: "دسته بندی", flex: 1, renderCell: (params) => params.value?.name },

        { field: "story", headerName: "داستان", flex: 4 },

        createActionsColumn<PoemResponse>({
            onEdit: (row) => { openModal(MODALS.EDIT_POEM, { poemId: row._id }) },
            onDelete: async (row) => {
                const ok = await confirm("آیا از حذف این شعر مطمئن هستید؟");

                if (!ok) return;

                deleteMutation.mutate(row._id);
            },
            customActions: [
                {
                    icon: <></>,
                    label: "ویرایش ابیات",
                    onClick: (row) => { router.push(`/dashboard/poems/${row._id}/hemistich`) }
                }
            ]
        }),
    ];

    return (
        <>
            <AppDataGrid
                grid={grid}
                rows={rows}
                rowCount={data?.meta?.total ?? 0}
                columns={columns}
                loading={isLoading}
                onAddClick={() => openModal(MODALS.ADD_POEM)}
            />

            <ShowModals />
        </>
    );
}
