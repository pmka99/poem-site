

import { HemistichResponse } from "@/shared/types/hemistich.type";
import HemistichItem from "./HemistichItem";
import { useState } from "react";
import { Button } from "@mui/material";
import { Position } from "@/enum/poem";
import { SelectedHemistichRange } from "../types";

type Props = {
    hemistichs: HemistichResponse[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onAddBefore: (id: string) => void;
    onAddAfter: (id: string) => void;
    onMoveGroup: (range: SelectedHemistichRange, targetId: string, position: Position) => void;
    onDeleteGroup: (range: SelectedHemistichRange) => void;
    onChangeVisibilityGroup: (range: SelectedHemistichRange, show: boolean) => void;
};



export default function HemistichList({
    hemistichs,
    onEdit,
    onDelete,
    onAddBefore,
    onAddAfter,
    onMoveGroup,
    onDeleteGroup,
    onChangeVisibilityGroup
}: Props) {

    if (!hemistichs.length) {
        return (
            <div className="text-center py-6 text-gray-500">
                نیم‌مصرعی وجود ندارد
            </div>
        );
    }

    const [active, setActive] = useState<HemistichResponse | null>(null);
    const [range, setRange] = useState<SelectedHemistichRange>(null)
    const [isGroupSelectActive, setIsGroupSelectActive] = useState<boolean>(false);
    const [isShowMovementButton, setIsShowMovementButton] = useState<boolean>(false)

    const cancelGroupOperation = () => {
        setIsGroupSelectActive(prev => !prev);
        if (isGroupSelectActive) { setRange(null); setIsShowMovementButton(false) };
    }

    const showGroupOperation = () => {
        setActive(null);
        setIsGroupSelectActive(prev => !prev);
    }

    const isInRange = (order: number): boolean => {
        if (!isGroupSelectActive) return false;

        if (!range?.first || !range?.last) return false;

        if (range.first.order <= order && order <= range.last.order) {
            return true
        }
        return false;
    }

    const changeActivity = (hemistich: HemistichResponse) => {
        setActive(hemistich);
        if (isGroupSelectActive && !(range?.first && range.last)) {
            if (!range?.first) {
                setRange({ first: hemistich })
            } else if (!range.last) {
                if (hemistich.order < range.first.order) {
                    setRange(prev => ({
                        first: hemistich,
                        last: prev?.first
                    }))
                } else {
                    setRange(prev => ({
                        ...prev, last: hemistich
                    }))
                }
            }
        }
    }

    const handlerMove = () => {
        setIsShowMovementButton(true)
    }

    const onAddGroupAfter = (targetId: string) => {
        onMoveGroup(range, targetId, Position.after);
        cancelGroupOperation();
    }

    const onAddGroupBefore =  (targetId: string) => {
        onMoveGroup(range, targetId, Position.before);
        cancelGroupOperation();
    }

    const onHideGroup = () => {
        onChangeVisibilityGroup(range, false);
        cancelGroupOperation();
    }

    const onVisibleGroup = () => {
        onChangeVisibilityGroup(range, true)
        cancelGroupOperation();
    }

    const onDeleteGroupHandler = () => {
        onDeleteGroup(range);
        cancelGroupOperation();
    }


    return (
        <div className="flex flex-col">
            <div className="flex h-16 p-2">
                {
                    isGroupSelectActive
                        ? (
                            <div className="flex h-fit gap-1">
                                {
                                    (!!range?.first && !!range.last) &&
                                    (<>
                                        <Button
                                            size="small"
                                            color="info"
                                            variant="contained"
                                            onClick={handlerMove}
                                        >
                                            جابه جایی
                                        </Button>
                                        <Button
                                            size="small"
                                            color="info"
                                            variant="contained"
                                            onClick={onHideGroup}
                                        >
                                            مخفی کردن
                                        </Button>
                                        <Button
                                            size="small"
                                            color="info"
                                            variant="contained"
                                            onClick={onVisibleGroup}
                                        >
                                            مشاهده
                                        </Button>
                                        <Button
                                            size="small"
                                            color="error"
                                            variant="contained"
                                            onClick={onDeleteGroupHandler}
                                        >
                                            حذف
                                        </Button>
                                    </>
                                    )
                                }
                                <Button
                                    size="small"
                                    color="error"
                                    variant="contained"
                                    onClick={cancelGroupOperation}
                                >
                                    انصراف
                                </Button>

                            </div>

                        ) : (
                            <div className="flex h-fit gap-1">
                                <Button
                                    size="small"
                                    variant="contained"
                                    onClick={showGroupOperation}
                                >
                                    انتخاب بازه گروهی
                                </Button>
                            </div>
                        )
                }

            </div>

            <div className="grid lg:grid-cols-2 lg:h-[34rem] overflow-y-auto">
                {hemistichs.map((h, i) => (
                    <div key={h._id} className={`${i % 2 === 0 ? "lg:mb-0" : "mb-3"}`}>
                        <HemistichItem
                            key={h._id}
                            isShowMovementButton={isShowMovementButton}
                            isGroupSelectActive={isGroupSelectActive}
                            isSelected={isInRange(h.order)}
                            isActive={h._id === active?._id}
                            setActive={() => changeActivity(h)}
                            hemistich={h}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            onAddBefore={onAddBefore}
                            onAddAfter={onAddAfter}
                            onAddGroupAfter={onAddGroupAfter}
                            onAddGroupBefore={onAddGroupBefore}
                        />
                    </div>
                ))}
            </div>
        </div >
    );
}
