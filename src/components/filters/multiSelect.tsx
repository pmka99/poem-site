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
    value?: (number | string)[];
    defaultValue?: (number | string)[];
    onChange?: (value: (number | string)[]) => void;
};

export function MultiSelect({
    items,
    label,
    value,
    defaultValue = [],
    onChange,
}: MultiSelectProps) {

    const [internalValue, setInternalValue] = useState<(number | string)[]>(defaultValue);

    const selected = value ?? internalValue;

    const handleChange = (event: SelectChangeEvent<(number | string)[]>) => {
        const val = event.target.value as (number | string)[];

        if (value === undefined) {
            setInternalValue(val);
        }

        onChange?.(val);
    };

    return (
        <FormControl size="small" fullWidth className="min-w-55">
            <InputLabel id="multi-select-label">{label}</InputLabel>

            <Select
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
