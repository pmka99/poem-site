import { Controller, useFormContext } from "react-hook-form";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    SelectChangeEvent,
} from "@mui/material";

type Item = {
    id: number | string;
    label: string;
};

type RHFSingleSelectProps = {
    name: string;
    items: Item[];
    label?: string;
    defaultValue?: number | string;
};

export function RHFSingleSelect({
    name,
    items,
    label = "Select",
    defaultValue = "",
}: RHFSingleSelectProps) {
    const { control } = useFormContext();

    const labelId = `${name}-label`;

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field, fieldState: { error } }) => (
                <FormControl
                    size="small"
                    fullWidth
                    error={!!error}
                    className="min-w-55"
                >
                    <InputLabel id={labelId}>{label}</InputLabel>

                    <Select
                        {...field}
                        labelId={labelId}
                        value={field.value ?? ""}
                        label={label}
                        className="bg-white rounded-lg"
                        onChange={(event: SelectChangeEvent<number | string>) =>
                            field.onChange(event.target.value)
                        }
                    >
                        {items.map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.label}
                            </MenuItem>
                        ))}
                    </Select>

                    <FormHelperText>
                        {error?.message}
                    </FormHelperText>
                </FormControl>
            )}
        />
    );
}
