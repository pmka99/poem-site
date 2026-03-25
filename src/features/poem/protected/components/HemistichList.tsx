import { Button } from "@mui/material";
import { useHemistichContex } from "../context/hemistichContext";
import HemistichItem from "./hemistichItem";
import HemistichToolbar from "./hemistichToolbar";
import { usePoem } from "../hooks";
import { PoemTypeResponse } from "@/shared/types/poemType.type";



export default function HemistichList() {

    const {
        hemistichs,
        active,
        total,
        poemId,

        onAddFirst,
        changeActivity,
        isInRange,
    } = useHemistichContex();

    const { data } = usePoem(poemId)
    const layout = (data?.data?.poemType as PoemTypeResponse)?.layout;

    const getLayoutClass = (i: number) => {
        if (layout === 2) {
            return i % 2 === 1 ? "lg:mb-0 mb-2" : "";
        }

        if (layout === 4) {
            if (i % 4 === 3) return "mb-8";
            if (i % 4 === 1) return "mb-2";
        }

        if (layout === 5) {
            if (i % 5 === 4) return "lg:w-full mb-8";
            if (i % 5 === 1 || i % 5 === 3) return "mb-2";
        }

        return "";
    };
    if (!hemistichs.length) {
        return (
            <>
                {
                    total === 0 && (
                        <Button
                            className="h-fit"
                            size="small"
                            variant="contained"
                            onClick={onAddFirst}
                        >
                            افزودن مصراع
                        </Button>
                    )
                }
                <div className="text-center py-6 text-gray-500">
                    نیم‌مصرعی وجود ندارد
                </div>

            </>
        );
    }

    return (
        <div className="flex flex-col max-h-150 lg:min-h-150">

            <HemistichToolbar />

            <div className="flex overflow-y-auto flex-wrap w-full">

                {hemistichs.map((h, i) => (
                    <div key={h._id}
                        className={`w-full lg:w-1/2 lg:p-1
                            ${getLayoutClass(i)}
                        `}
                    >
                        <HemistichItem
                            key={h._id}
                            hemistich={h}
                            isActive={h._id === active?._id}
                            isSelected={isInRange(h.order)}
                            setActive={() => changeActivity(h)}
                        />
                    </div>

                ))}

            </div>

        </div>
    );
}
