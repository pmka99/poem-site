"use client";

import * as React from "react";
import {
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarDensitySelector,
    GridToolbarFilterButton,
} from "@mui/x-data-grid";
import { TextField, Button, Stack } from "@mui/material";
import { GridToolbarProps } from "@mui/x-data-grid";
import { useGridApiContext } from "@mui/x-data-grid";

export type GridToolbarAction = {
    label: string;
    icon?: React.ReactElement;
    onClick: () => void;
    color?: "primary" | "secondary" | "error" | "info" | "success";
    variant?: "text" | "outlined" | "contained";
};

export type GridSearchToolbarProps = GridToolbarProps & {
    mode?: "client" | "server";
    value?: string;
    onSearchChange?: (value: string) => void;
    debounceMs?: number;
    actions?: GridToolbarAction[];
};

export function GridSearchToolbar({
    mode = "client",
    value = "",
    onSearchChange,
    debounceMs = 500,
    actions = [],
}: GridSearchToolbarProps) {
    const apiRef = useGridApiContext();
    const [localValue, setLocalValue] = React.useState(value);

    React.useEffect(() => {
        const t = setTimeout(() => {
            if (mode === "client") {
                apiRef.current.setQuickFilterValues(localValue ? [localValue] : []);
            } else {
                onSearchChange?.(localValue);
            }
        }, debounceMs);
        return () => clearTimeout(t);
    }, [localValue, debounceMs, mode, onSearchChange]);

    return (
        <GridToolbarContainer sx={{ justifyContent: "space-between", p: 1 }}>
            {/* سمت چپ - دکمه‌ها */}
            <Stack direction="row" spacing={1}>
                {actions.map((action, i) => (
                    <Button
                        key={i}
                        variant={action.variant ?? "contained"}
                        color={action.color ?? "primary"}
                        startIcon={action.icon}
                        onClick={action.onClick}
                    >
                        {action.label}
                    </Button>
                ))}
            </Stack>

            {/* سمت راست - سرچ و ابزار گرید */}
            <Stack direction="row" spacing={1} alignItems="center">
                <TextField
                    size="small"
                    placeholder="جستجو..."
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    sx={{ width: 220 }}
                />
                {/* <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector /> */}
            </Stack>
        </GridToolbarContainer>
    );
}
