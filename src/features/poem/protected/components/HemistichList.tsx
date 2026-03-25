import { useHemistich } from "../context/HemistichContext";
import HemistichItem from "./HemistichItem";
import HemistichToolbar from "./HemistichToolbar";

export default function HemistichList() {

    const {
        hemistichs,
        active,

        changeActivity,
        isInRange,
    } = useHemistich();

    if (!hemistichs.length) {
        return (
            <div className="text-center py-6 text-gray-500">
                نیم‌مصرعی وجود ندارد
            </div>
        );
    }

    return (
        <div className="flex flex-col">

            <HemistichToolbar />

            <div className="grid lg:grid-cols-2 overflow-y-auto">

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
