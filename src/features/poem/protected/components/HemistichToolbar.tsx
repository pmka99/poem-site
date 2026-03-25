import { useHemistichContex } from "../context/hemistichContext";
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
    } = useHemistichContex();

    return (
        <div className="flex h-16 p-2">

            {isGroupSelectActive ? (

                <div className="flex gap-1 h-fit">

                    {range?.first && range?.last && (
                        <>
                            <Button
                                color="info"
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
                        color="secondary"
                        variant="contained"
                        onClick={cancelGroupOperation}
                    >
                        انصراف
                    </Button>

                </div>

            ) : (

                <Button
                    className="h-fit"
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
