"use client";

import * as React from "react";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import { GridToolbarProps } from "@mui/x-data-grid";

export type GridSearchToolbarProps = GridToolbarProps & {
    value?: string;
    onSearchChange?: (value: string) => void;
    debounceMs?: number;
};

export function GridSearchToolbar(props: GridSearchToolbarProps) {
    const {
        value = "",
        onSearchChange,
        debounceMs = 500,
    } = props;

    const [localValue, setLocalValue] = React.useState(value ?? "");

    React.useEffect(() => {
        setLocalValue(value);
    }, [value]);

    React.useEffect(() => {
        const t = setTimeout(() => {
            onSearchChange?.(localValue);
        }, debounceMs);

        return () => clearTimeout(t);
    }, [localValue, debounceMs, onSearchChange]);

    return (
        <GridToolbarContainer sx={{ justifyContent: "flex-end", p: 1 }}>
            <TextField
                size="small"
                placeholder="جستجو..."
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                sx={{ width: 240 }}
            />
        </GridToolbarContainer>
    );
}
