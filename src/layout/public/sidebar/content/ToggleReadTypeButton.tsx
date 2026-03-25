"use client";

import { useReadType } from "@/hooks/index";
import MuiProvider from "@/theme/MuiProvider";
import { Button } from "@mui/material";

export default function ToggleReadTypeButton() {
    const { readType, toggleReadType } = useReadType();

    return (
        <MuiProvider>
            <Button
            fullWidth
                color="info"
                variant="contained"
                onClick={toggleReadType}>
                {readType === "infinit-scroll"
                    ? "نمایش چند صفحه‌ای"
                    : "نمایش اسکرول بی‌نهایت"}
            </Button>

        </MuiProvider>
    );
}
