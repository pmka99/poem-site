import { HemistichResponse } from "@/shared/types/hemistich.type";

export default function HemistichItem({
    hemistich,
}: {
    hemistich: HemistichResponse,
}) {

    return (
        <div className="justify-between md:h-8 rounded-sm px-1 flex items-center">
            <div>{hemistich.text}</div>
        </div>
    );
}
