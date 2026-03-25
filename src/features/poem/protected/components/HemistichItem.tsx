import { useHemistich } from "../context/HemistichContext";
import { IconButton } from "@mui/material";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";

export default function HemistichItem({
    hemistich,
    isActive,
    isSelected,
    setActive,
}: any) {

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
        flex justify-between p-2
        ${isSelected ? "text-accent" : isActive ? "text-primary" : ""}
      `}
        >
            <div>{hemistich.text}</div>

            <div className="flex gap-2">

                {!isShowMovementButton && !isGroupSelectActive && (
                    <>
                        <IconButton onClick={() => onAddBefore(hemistich._id)}>
                            <FiPlus />
                        </IconButton>

                        <IconButton onClick={() => onAddAfter(hemistich._id)}>
                            <FiPlus />
                        </IconButton>

                        <IconButton onClick={() => onEdit(hemistich._id)}>
                            <FiEdit />
                        </IconButton>

                        <IconButton onClick={() => onDelete(hemistich._id)}>
                            <FiTrash />
                        </IconButton>
                    </>
                )}

                {isShowMovementButton && !isSelected && (
                    <>
                        <IconButton onClick={() => moveGroupBefore(hemistich._id)}>
                            <FiPlus />
                        </IconButton>

                        <IconButton onClick={() => moveGroupAfter(hemistich._id)}>
                            <FiPlus />
                        </IconButton>
                    </>
                )}

            </div>
        </div>
    );
}
