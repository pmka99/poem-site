"use client";

import { useConfirm, useModal, useViewMode } from "@/hooks"
import ViewModeSwitcher from "@/features/poem/protected/components/ViewModeSwitcher"
import { DashboardPaginationHemistichView } from "./paginationView"
import { MODALS } from "@/types/modals";
import { useDeleteHemistich } from "@/features/poem/protected/hooks";
import { Position } from "@/enum/poem";
import DashboardHemistichAddModal from "./actions/add";
import DashboardHemistichEditModal from "./actions/edit";
import { SelectedHemistichRange } from "@/features/poem/protected/types";
// import { InfiniteHemistichView } from "./infiniteScrollView"

export default function DashboardPoemsHemistichView({
    poemId
}: {
    poemId: string
}) {
    const { openModal, modals } = useModal();
    const confirm = useConfirm();

    const { mode, setMode } = useViewMode();

    const onAddfirst = () => {
        openModal(MODALS.ADD_HEMISTICH, { poemId, position: Position.first })
    }

    const onAddBefore = (hemistichId: string) => {
        openModal(MODALS.ADD_HEMISTICH, { poemId, hemistichId, position: Position.before })
    }

    const onAddAfter = (hemistichId: string) => {
        openModal(MODALS.ADD_HEMISTICH, { poemId, hemistichId, position: Position.after })
    }

    const onEdit = (hemistichId: string) => {
        openModal(MODALS.EDIT_HEMISTICH, { poemId, hemistichId })
    }

    const deleteMutation = useDeleteHemistich(poemId);

    const onDelete = async (hemistichId: string) => {
        const ok = await confirm("آیا از حذف این مصرع مطمئن هستید؟");
        if (!ok) return;
        deleteMutation.mutate(hemistichId);
    }

    const onMove = async (range: SelectedHemistichRange, targetId: string, position: Position) => {

    }

    return (
        <div className="h-full">
            <ViewModeSwitcher
                mode={mode}
                onChange={setMode}
            />

            {mode === "pagination" ? (
                <DashboardPaginationHemistichView
                    poemId={poemId}
                    onAddfirst={onAddfirst}
                    onAddAfter={onAddAfter}
                    onAddBefore={onAddBefore}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onMove={onMove}
                />
            ) : (
                // <InfiniteHemistichView poemId={poemId} />
                <></>
            )}

            {modals[MODALS.ADD_HEMISTICH]?.open && <DashboardHemistichAddModal />}
            {modals[MODALS.EDIT_HEMISTICH]?.open && <DashboardHemistichEditModal />}

        </div>
    )
}
