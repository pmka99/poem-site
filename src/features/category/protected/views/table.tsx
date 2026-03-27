"use client";

import { useConfirm, useModal } from "@/hooks";
import { MODALS } from "@/types/modals";


import { CategoryResponse } from "@/shared/types/category.type";

import {
    AppDataGrid,
    createActionsColumn,
    useDataGrid,
} from "@/components/datagrid";

import { GridColDef } from "@mui/x-data-grid";

import ShowModals from "./actions";
import { useDeleteCategory, useCategorys } from "@/features/category/protected/hooks";

export default function DashboardCategorysTable() {
    const { openModal } = useModal();
    const confirm = useConfirm();

    const grid = useDataGrid({ mode: "client" });

    const { data, isLoading } = useCategorys();

    const deleteMutation = useDeleteCategory();

    const rows = data?.data ?? [];




    const columns: GridColDef<CategoryResponse>[] = [
        { field: "title", headerName: "نام", flex: 1 },

        { field: "description", headerName: "توضیحات", flex: 1 },

        createActionsColumn<CategoryResponse>({
            onEdit: (row) => { openModal(MODALS.EDIT_CATEGORY, { categoryId: row._id }) },
            onDelete: async (row) => {
                const ok = await confirm("آیا از حذف این موضوع شعر مطمئن هستید؟");

                if (!ok) return;

                deleteMutation.mutate(row._id);
            },
        }),
    ];

    return (
        <>
            <AppDataGrid
                grid={grid}
                rows={rows}
                columns={columns}
                loading={isLoading}
                onAddClick={() => openModal(MODALS.ADD_CATEGORY)}
            />

            <ShowModals />
        </>
    );
}
