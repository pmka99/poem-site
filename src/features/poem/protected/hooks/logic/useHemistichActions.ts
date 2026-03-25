import { Position } from "@/enum/poem";
import { SelectedHemistichRange } from "@features/poem/protected/types";

import {
    useDeleteHemistich,
    useDeleteHemistichRange,
    useMoveHemistichRange,
    useUpdateHemistichVisibilityRange,
} from "../index";

export function useHemistichActions(poemId: string) {

    const deleteHemistich = useDeleteHemistich(poemId);
    const deleteRange = useDeleteHemistichRange(poemId);
    const moveRange = useMoveHemistichRange(poemId);
    const updateVisibilityRange =
        useUpdateHemistichVisibilityRange(poemId);

    const deleteOne = (id: string) => {
        deleteHemistich.mutate(id);
    };

    const moveGroup = (
        range: SelectedHemistichRange,
        targetHemistichId: string,
        position: Position
    ) => {

        if (!(range?.first && range?.last)) return;

        moveRange.mutate({
            range: {
                firstOrder: range.first.order,
                lastOrder: range.last.order,
            },
            targetHemistichId,
            position,
        });
    };

    const deleteGroup = (range: SelectedHemistichRange) => {

        if (!(range?.first && range?.last)) return;

        deleteRange.mutate({
            range: {
                firstOrder: range.first.order,
                lastOrder: range.last.order,
            },
        });
    };

    const changeVisibilityGroup = (
        range: SelectedHemistichRange,
        show: boolean
    ) => {

        if (!(range?.first && range?.last)) return;

        updateVisibilityRange.mutate({
            show,
            range: {
                firstOrder: range.first.order,
                lastOrder: range.last.order,
            },
        });
    };

    return {
        deleteOne,
        moveGroup,
        deleteGroup,
        changeVisibilityGroup,
    };
}
