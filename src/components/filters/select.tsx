import { useState } from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";

type Item = {
    id: number | string;
    label: string;
};

type SingleSelectProps = {
    items: Item[];
    label?: string;
    value?: number | string;
    defaultValue?: number | string;
    onChange?: (value: number | string) => void;
};

export function SingleSelect({
    items,
    label = "Select",
    value,
    defaultValue = "",
    onChange,
}: SingleSelectProps) {
    const [internalValue, setInternalValue] = useState<number | string>(defaultValue);

    const selected = value ?? internalValue;

    const handleChange = (event: SelectChangeEvent<number | string>) => {
        const val = event.target.value as number | string;

        if (value === undefined) {
            setInternalValue(val);
        }

        onChange?.(val);
    };

    return (
        <FormControl size="small" fullWidth className="min-w-55">
            <InputLabel id="single-select-label">{label}</InputLabel>

            <Select
                labelId="single-select-label"
                value={selected}
                label={label}
                onChange={handleChange}
                className="bg-white rounded-lg"
            >
                {items.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                        {item.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
