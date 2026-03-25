import { useHemistichContex } from "../context/hemistichContext";
import HemistichItem from "./hemistichItem";
import HemistichToolbar from "./hemistichToolbar";

export default function HemistichList() {

    const {
        hemistichs,
        active,

        changeActivity,
        isInRange,
    } = useHemistichContex();

    if (!hemistichs.length) {
        return (
            <div className="text-center py-6 text-gray-500">
                نیم‌مصرعی وجود ندارد
            </div>
        );
    }

    return (
        <div className="flex flex-col max-h-150 lg:min-h-150">

            <HemistichToolbar />

            <div className="grid lg:grid-cols-2 gap-1 overflow-y-auto">

                {hemistichs.map((h) => (

                    <HemistichItem
                        key={h._id}
                        hemistich={h}
                        isActive={h._id === active?._id}
                        isSelected={isInRange(h.order)}
                        setActive={() => changeActivity(h)}
                    />

                ))}

            </div>

        </div>
    );
}
