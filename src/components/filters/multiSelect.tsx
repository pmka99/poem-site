import { useState } from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    ListItemText,
    SelectChangeEvent,
} from "@mui/material";

type Item = {
    id: number | string;
    label: string;
};

type MultiSelectProps = {
    items: Item[];
    label?: string;
    onChange?: (value: (number | string)[]) => void;
};

export function MultiSelect({
    items,
    label = "Select",
    onChange,
}: MultiSelectProps) {
    const [selected, setSelected] = useState<(number | string)[]>([]);

    const handleChange = (event: SelectChangeEvent<(number | string)[]>) => {
        const value = event.target.value as (number | string)[];
        setSelected(value);
        onChange?.(value);
    };

    return (
        <FormControl size="small" fullWidth className="min-w-55">
            <InputLabel id="multi-select-label">{label}</InputLabel>

            <Select
                size="small"
                labelId="multi-select-label"
                multiple
                value={selected}
                label={label}
                onChange={handleChange}
                className="bg-white rounded-lg"
                renderValue={(selectedIds) =>
                    items
                        .filter((item) => selectedIds.includes(item.id))
                        .map((item) => item.label)
                        .join(", ")
                }
            >
                {items.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                        <Checkbox checked={selected.includes(item.id)} />
                        <ListItemText primary={item.label} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
