import { GridColDef, GridActionsCellItem, GridValidRowModel } from "@mui/x-data-grid";
import React from "react";
import { MdEdit, MdDelete, MdVisibility, MdMoreVert } from "react-icons/md";

type CustomAction<T> = {
    label: string;
    icon: React.ReactElement;
    onClick: (row: T) => void | Promise<void>;
    showInMenu?: boolean;
};

type Options<T> = {
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    onView?: (row: T) => void;
    customActions?: CustomAction<T>[];
};

export function createActionsColumn<T extends GridValidRowModel>({
    onEdit,
    onDelete,
    onView,
    customActions = [],
}: Options<T>): GridColDef<T> {
    return {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 120,
        renderHeader: () => <MdMoreVert size={20} />,

        getActions: (params) => {
            const row = params.row as T;
            const actions = [];

            if (onView) {
                actions.push(
                    <GridActionsCellItem
                        key="view"
                        icon={<MdVisibility size={20} />}
                        label="مشاهده"
                        onClick={() => onView(row)}
                    />
                );
            }

            if (onEdit) {
                actions.push(
                    <GridActionsCellItem
                        key="edit"
                        icon={<MdEdit size={20} />}
                        label="ویرایش"
                        onClick={() => onEdit(row)}
                    />
                );
            }

            if (onDelete) {
                actions.push(
                    <GridActionsCellItem
                        key="delete"
                        icon={<MdDelete size={20} />}
                        label="حذف"
                        onClick={() => onDelete(row)}
                        showInMenu
                    />
                );
            }

            customActions.forEach((action, i) => {
                actions.push(
                    <GridActionsCellItem
                        key={`custom-${i}`}
                        icon={action.icon}
                        label={action.label}
                        onClick={() => action.onClick(row)}
                        showInMenu={action.showInMenu ?? true}
                    />
                );
            });

            return actions;
        },
    };
}
