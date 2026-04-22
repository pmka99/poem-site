

"use client";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useReaderSetting } from "@/hooks";
import MuiProvider from "@/theme/MuiProvider";


export function ReadTypeSelector() {
    const { readType, toggleReadType } = useReaderSetting();

    const handleChange = () => toggleReadType();

    return (
        <ToggleButtonGroup
            className="bg-background w-fit"
            exclusive
            value={readType}
            onChange={handleChange}
            color="primary"
            size="small"
        >
            <ToggleButton value="infinit-scroll">اسکرول بی‌نهایت</ToggleButton>
            <ToggleButton value="pagination">صفحه‌به‌صفحه</ToggleButton>
        </ToggleButtonGroup>
    );
}


export function FontSizeSelector() {

    const { fontSize, setFontSize } = useReaderSetting();

    const handleChange = (_: any, val: string | null) => {
        if (!val) return;
        setFontSize(val as any);
    };

    return (
        <ToggleButtonGroup
            className="bg-background w-fit"
            exclusive
            value={fontSize}
            onChange={handleChange}
            color="primary"
            size="small"
        >
            <ToggleButton value="small">کوچک</ToggleButton>
            <ToggleButton value="medium">متوسط</ToggleButton>
            <ToggleButton value="large">بزرگ</ToggleButton>
        </ToggleButtonGroup>
    );
}


export function FontStyleSelector() {
    const { fontStyle, setFontStyle } = useReaderSetting();

    const handleChange = (_: any, val: string | null) => {
        if (!val) return;
        setFontStyle(val as any);
    };

    return (
        <ToggleButtonGroup
            className="bg-background w-fit"
            exclusive
            value={fontStyle}
            onChange={handleChange}
            color="primary"
            size="small"
        >
            <ToggleButton value="nastaliq">نستعلیق</ToggleButton>
            <ToggleButton value="naskh">نسخ</ToggleButton>
        </ToggleButtonGroup>
    );
}



export default function ReaderSetting() {

    return (
        <MuiProvider>
            <div className="flex flex-col px-2 gap-2">
                <ReadTypeSelector />
                <FontSizeSelector />
                <FontStyleSelector />
            </div>
        </MuiProvider>
    );
}

