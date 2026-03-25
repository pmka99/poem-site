"use client";

import { useConfirm, useModal, useViewMode } from "@/hooks"
import ViewModeSwitcher from "@/features/poem/protected/components/ViewModeSwitcher"
import { DashboardPaginationHemistichView } from "./paginationView"
import { MODALS } from "@/types/modals";
import { useDeleteHemistich, useDeleteHemistichRange, useMoveHemistichRange, useUpdateHemistichVisibilityRange } from "@/features/poem/protected/hooks";
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

    // Single Operation ----------------------------------

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

    // Group Operation -----------------------------------------

    const moveHemistichRange = useMoveHemistichRange(poemId);

    const onMoveGroup = async (range: SelectedHemistichRange, targetId: string, position: Position) => {
        if (!(range?.first && range?.last)) return
        await moveHemistichRange.mutate({
            range: {
                firstOrder: range.first.order,
                lastOrder: range.last.order
            },
            targetHemistichId: targetId,
            position
        })
    }

    const deleteRangeMutation = useDeleteHemistichRange(poemId)

    const onDeleteGroup = async (range: SelectedHemistichRange) => {
        if (!(range?.first && range?.last)) return
        await deleteRangeMutation.mutate({
            range: {
                firstOrder: range?.first?.order,
                lastOrder: range?.last?.order
            }
        })

    }

    const updateHemistichVisibilityRange = useUpdateHemistichVisibilityRange(poemId)

    const onChangeVisibilityGroup = async (range: SelectedHemistichRange, show: boolean) => {
        if (!(range?.first && range?.last)) return
        await updateHemistichVisibilityRange.mutate(
            {
                show,
                range: {
                    firstOrder: range.first.order,
                    lastOrder: range.last.order
                }
            }
        )
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
                    onMoveGroup={onMoveGroup}
                    onDeleteGroup={onDeleteGroup}
                    onChangeVisibilityGroup={onChangeVisibilityGroup}
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
