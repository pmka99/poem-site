import { HemistichResponse } from "@/shared/types/hemistich.type";
import { useHemistich } from "../context/HemistichContext";
import { IconButton } from "@mui/material";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";

export default function HemistichItem({
    hemistich,
    isActive,
    isSelected,
    setActive,
}: {
    hemistich: HemistichResponse,
    isActive: boolean,
    isSelected: boolean,
    setActive: () => void,
}) {

    const {
        isGroupSelectActive,
        isShowMovementButton,

        onEdit,
        onDelete,
        onAddBefore,
        onAddAfter,

        moveGroupBefore,
        moveGroupAfter,
    } = useHemistich();

    return (
        <div
            onClick={setActive}
            className={`
                md:h-8 rounded-sm px-1
                flex items-center justify-between
                ${isSelected ? "bg-primary" :
                isActive ? "bg-primary" :
                        !hemistich.show ? "text-gray-400"
                            : ""}
            `}
        >
            <div>{hemistich.text}</div>

            <div className="flex lg:gap-2 gap-1 min-w-35">

                {!isShowMovementButton && !isGroupSelectActive && (
                    <>
                        <IconButton   onClick={() => onAddBefore(hemistich._id)}>
                            <FiPlus className="w-4" />
                        </IconButton>

                        <IconButton onClick={() => onAddAfter(hemistich._id)}>
                            <FiPlus className="w-4" />
                        </IconButton>

                        <IconButton color="info" onClick={() => onEdit(hemistich._id)}>
                            <FiEdit className="w-4" />
                        </IconButton>

                        <IconButton color="error" onClick={() => onDelete(hemistich._id)}>
                            <FiTrash className="w-4" />
                        </IconButton>
                    </>
                )}

                {isShowMovementButton && !isSelected && (
                    <>
                        <IconButton onClick={() => moveGroupBefore(hemistich._id)}>
                            <FiPlus className="w-4" />
                        </IconButton>

                        <IconButton onClick={() => moveGroupAfter(hemistich._id)}>
                            <FiPlus className="w-4" />
                        </IconButton>
                    </>
                )}

            </div>
        </div>
    );
}
