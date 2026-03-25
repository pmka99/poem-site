import { useState } from "react";
import { HemistichResponse } from "@/shared/types/hemistich.type";
import { SelectedHemistichRange } from "../../types";



export function useHemistichSelection() {

    const [active, setActive] = useState<HemistichResponse | null>(null);
    const [range, setRange] = useState<SelectedHemistichRange>(null);
    const [isGroupSelectActive, setIsGroupSelectActive] = useState(false);
    const [isShowMovementButton, setIsShowMovementButton] = useState(false);

    const cancelGroupOperation = () => {
        setIsGroupSelectActive(false);
        setRange(null);
        setIsShowMovementButton(false);
    };

    const showGroupOperation = () => {
        setActive(null);
        setIsGroupSelectActive(true);
    };

    const isInRange = (order: number) => {

        if (!range?.first || !range?.last) return false;

        return (
            range.first.order <= order &&
            order <= range.last.order
        );
    };

    const changeActivity = (hemistich: HemistichResponse) => {

        setActive(hemistich);

        if (isGroupSelectActive && !(range?.first && range?.last)) {

            if (!range?.first) {
                setRange({ first: hemistich });
            }

            else if (!range.last) {

                if (hemistich.order < range.first.order) {

                    setRange({
                        first: hemistich,
                        last: range.first,
                    });

                } else {

                    setRange({
                        ...range,
                        last: hemistich,
                    });

                }

            }
        }
    };

    return {
        active,
        range,
        isGroupSelectActive,
        isShowMovementButton,

        setIsShowMovementButton,

        cancelGroupOperation,
        showGroupOperation,
        changeActivity,
        isInRange,
    };
}
