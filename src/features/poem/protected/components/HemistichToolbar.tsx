import { useHemistich } from "../context/HemistichContext";
import { Button } from "@mui/material";

export default function HemistichToolbar() {

    const {
        isGroupSelectActive,
        range,

        showGroupOperation,
        cancelGroupOperation,

        enableMovementMode,
        deleteGroup,
        hideGroup,
        showGroup,
    } = useHemistich();

    return (
        <div className="flex h-16 p-2">

            {isGroupSelectActive ? (

                <div className="flex gap-1">

                    {range?.first && range?.last && (
                        <>
                            <Button
                                size="small"
                                variant="contained"
                                onClick={enableMovementMode}
                            >
                                جابه جایی
                            </Button>

                            <Button
                                size="small"
                                variant="contained"
                                onClick={hideGroup}
                            >
                                مخفی
                            </Button>

                            <Button
                                size="small"
                                variant="contained"
                                onClick={showGroup}
                            >
                                نمایش
                            </Button>

                            <Button
                                size="small"
                                color="error"
                                variant="contained"
                                onClick={deleteGroup}
                            >
                                حذف
                            </Button>
                        </>
                    )}

                    <Button
                        size="small"
                        color="error"
                        variant="contained"
                        onClick={cancelGroupOperation}
                    >
                        انصراف
                    </Button>

                </div>

            ) : (

                <Button
                    size="small"
                    variant="contained"
                    onClick={showGroupOperation}
                >
                    انتخاب بازه
                </Button>

            )}

        </div>
    );
}
