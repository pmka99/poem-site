import type { TextFieldProps } from '@mui/material/TextField';

import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';


export type RHFTextFieldProps = TextFieldProps & {
    name: string;
};

export function RHFTextField({
    name,
    helperText,
    slotProps,
    type = 'text',
    ...other
}: RHFTextFieldProps) {
    const { control } = useFormContext();

    const isNumberType = type === 'number';

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <TextField
                    size={other.size ?? 'small'}
                    {...field}
                    fullWidth
                    value={field.value}
                    onChange={(event) => {
                        field.onChange(isNumberType ? Number(event.target.value) : event.target.value);
                    }}
                    onBlur={(event) => {
                        field.onChange(isNumberType ? Number(event.target.value) : event.target.value);
                    }}
                    type={isNumberType ? 'text' : type}
                    error={!!error}
                    helperText={error?.message ?? helperText}
                    slotProps={{
                        ...slotProps,
                        htmlInput: {
                            autoComplete: 'off',
                            ...slotProps?.htmlInput,
                            ...(isNumberType && { inputMode: 'decimal', pattern: '[0-9]*\\.?[0-9]*' }),
                        },
                    }}
                    {...other}
                />
            )}
        />
    );
}
