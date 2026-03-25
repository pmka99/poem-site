import { useConfirm, useModal } from "@/hooks";
import { MODALS } from "@/types/modals";
import { Position } from "@/enum/poem";

import { useHemistichActions } from "./useHemistichActions";
import { useHemistichSelection } from "./useHemistichSelection";
import { useHemistichInfinite } from "./useHemistichInfinite";
import { useHemistichPagination } from "./useHemistichPagination";

export type HemistichMode = "pagination" | "infinite";

export function useHemistichController(
    poemId: string,
    mode: HemistichMode = "infinite"
) {

    const confirm = useConfirm();
    const { openModal } = useModal();

    const actions = useHemistichActions(poemId);
    const selection = useHemistichSelection();

    const infinite = useHemistichInfinite(poemId);
    const pagination = useHemistichPagination(poemId);

    // ---------- single actions ----------

    const onAddFirst = () => {
        openModal(MODALS.ADD_HEMISTICH, {
            poemId,
            position: Position.first,
        });
    };

    const onAddBefore = (id: string) => {
        openModal(MODALS.ADD_HEMISTICH, {
            poemId,
            hemistichId: id,
            position: Position.before,
        });
    };

    const onAddAfter = (id: string) => {
        openModal(MODALS.ADD_HEMISTICH, {
            poemId,
            hemistichId: id,
            position: Position.after,
        });
    };

    const onEdit = (id: string) => {
        openModal(MODALS.EDIT_HEMISTICH, {
            poemId,
            hemistichId: id,
        });
    };

    const onDelete = async (id: string) => {

        const ok = await confirm("آیا از حذف این مصرع مطمئن هستید؟");

        if (!ok) return;

        actions.deleteOne(id);
    };

    // ---------- group actions ----------

    const moveGroupBefore = (targetId: string) => {

        actions.moveGroup(
            selection.range,
            targetId,
            Position.before
        );

        selection.cancelGroupOperation();
    };

    const moveGroupAfter = (targetId: string) => {

        actions.moveGroup(
            selection.range,
            targetId,
            Position.after
        );

        selection.cancelGroupOperation();
    };

    const deleteGroup = async () => {

        const ok = await confirm("آیا از حذف گروه مطمئن هستید؟");

        if (!ok) return;

        actions.deleteGroup(selection.range);

        selection.cancelGroupOperation();
    };

    const hideGroup = () => {

        actions.changeVisibilityGroup(
            selection.range,
            false
        );

        selection.cancelGroupOperation();
    };

    const showGroup = () => {

        actions.changeVisibilityGroup(
            selection.range,
            true
        );

        selection.cancelGroupOperation();
    };

    const enableMovementMode = () => {
        selection.setIsShowMovementButton(true);
    };

    const shared = {
        ...selection,
        ...actions,

        onAddFirst,
        onAddBefore,
        onAddAfter,
        onEdit,
        onDelete,

        moveGroupBefore,
        moveGroupAfter,
        deleteGroup,
        hideGroup,
        showGroup,
        enableMovementMode,
    };

    if (mode === "pagination") {
        return {
            mode: "pagination" as const,
            ...pagination,
            ...shared,
        };
    }

    return {
        mode: "infinite" as const,
        ...infinite,
        ...shared,
    };
}
