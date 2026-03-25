import { HemistichResponse } from "@/shared/types/hemistich.type";
import {
    IconButton,
    Menu,
    MenuItem,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { FiEdit, FiPlus, FiTrash, FiMoreVertical } from "react-icons/fi";
import { useState } from "react";

type Props = {
    hemistich: HemistichResponse;
    isShowMovementButton?: boolean;
    isActive: boolean;
    isSelected: boolean;
    isGroupSelectActive: boolean;
    setActive: () => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onAddBefore: (id: string) => void;
    onAddAfter: (id: string) => void;
    onAddGroupBefore: (id: string) => void;
    onAddGroupAfter: (id: string) => void;
};

export default function HemistichItem({
    hemistich,
    isShowMovementButton,
    isActive,
    isSelected,
    isGroupSelectActive,
    setActive,
    onEdit,
    onDelete,
    onAddBefore,
    onAddAfter,
    onAddGroupBefore,
    onAddGroupAfter
}: Props) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const openMenu = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        setAnchorEl(e.currentTarget);
    };

    const closeMenu = () => setAnchorEl(null);

    const handle = (cb: (id: string) => void) => {
        cb(hemistich._id);
        closeMenu();
    };

    return (
        <div
            onClick={setActive}
            className={`
                group flex h-12 items-center
                justify-between py-3 px-2
                ${isSelected ? "text-accent " : isActive ? "text-primary" : !hemistich.show ? "text-gray-300" : ""}
            `}
        >
            <div>{hemistich.text}</div>

            {isMobile ? (
                <>
                    <IconButton size="small" onClick={openMenu}>
                        <FiMoreVertical />
                    </IconButton>

                    <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
                        <Menu anchorEl={anchorEl} open={open} onClose={closeMenu}>
                            {!isShowMovementButton && !isGroupSelectActive && (
                                <MenuItem onClick={() => handle(onAddBefore)}>
                                    <FiPlus style={{ marginLeft: 8 }} />
                                    افزودن به قبل
                                </MenuItem>
                            )}

                            {!isShowMovementButton && !isGroupSelectActive && (
                                <MenuItem onClick={() => handle(onAddAfter)}>
                                    <FiPlus style={{ marginLeft: 8 }} />
                                    افزودن به بعد
                                </MenuItem>
                            )}

                            {!isShowMovementButton && !isGroupSelectActive && (
                                <MenuItem onClick={() => handle(onEdit)}>
                                    <FiEdit style={{ marginLeft: 8 }} />
                                    ویرایش
                                </MenuItem>
                            )}

                            {!isShowMovementButton && !isGroupSelectActive && (
                                <MenuItem onClick={() => handle(onDelete)}>
                                    <FiTrash style={{ marginLeft: 8 }} />
                                    حذف
                                </MenuItem>
                            )}

                            {!isShowMovementButton && isGroupSelectActive && !isSelected && (
                                <MenuItem onClick={() => handle(onAddGroupBefore)}>
                                    <FiPlus style={{ marginLeft: 8 }} />
                                    افزودن به قبل
                                </MenuItem>
                            )}

                            {!isShowMovementButton && isGroupSelectActive && !isSelected && (
                                <MenuItem onClick={() => handle(onAddGroupAfter)}>
                                    <FiPlus style={{ marginLeft: 8 }} />
                                    افزودن به بعد
                                </MenuItem>
                            )}
                        </Menu>

                    </Menu>
                </>
            ) : (
                <div
                    className={`gap-2 group-hover:flex ${isActive ? "flex" : "hidden"
                        }`}
                >
                    {!isShowMovementButton
                        ? !isGroupSelectActive && (<>
                            <IconButton
                                color="primary"
                                size="small"
                                title="افزودن به قبل"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAddBefore?.(hemistich._id);
                                }}
                            >
                                <FiPlus />
                            </IconButton>

                            <IconButton
                                color="primary"
                                size="small"
                                title="افزودن به بعد"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAddAfter?.(hemistich._id);
                                }}
                            >
                                <FiPlus />
                            </IconButton>
                            <IconButton
                                size="small"
                                color="info"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit?.(hemistich._id);
                                }}
                            >
                                <FiEdit />
                            </IconButton>

                            <IconButton
                                size="small"
                                color="error"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete?.(hemistich._id);
                                }}
                            >
                                <FiTrash />
                            </IconButton>
                        </>
                        ) : !isSelected && (
                            <>
                                <IconButton
                                    color="primary"
                                    size="small"
                                    title="افزودن به قبل"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onAddGroupBefore?.(hemistich._id);
                                    }}
                                >
                                    <FiPlus />
                                </IconButton>

                                <IconButton
                                    color="primary"
                                    size="small"
                                    title="افزودن به بعد"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onAddGroupAfter?.(hemistich._id);
                                    }}
                                >
                                    <FiPlus />
                                </IconButton>
                            </>
                        )}
                </div>
            )}
        </div>
    );
}
