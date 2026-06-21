import { HemistichResponse } from "@/shared/types/hemistich.type";
import ShowHemistich from "./showHemistich";

function Hemistich({ children }: { children: React.ReactNode }) {

    const hemistich = children?.toLocaleString() || "";


    return (
        <div className="w-full select-none">
            <ShowHemistich hemistich={hemistich} />
            <p className="sr-only">
                {hemistich}
            </p>
        </div>
    )
}

export default function HemistichItem({
    hemistich,
    averageLengthText,
}: {
    hemistich: HemistichResponse,
    averageLengthText: number
}) {
    console.log(averageLengthText);
    

    return (
        <div className={`justify-between w-full h-fit ${averageLengthText > 32 ? "lg:px-1" : "lg:px-5"
            } rounded-sm py-4  flex items-center`}>
            <Hemistich>{hemistich.text}</Hemistich>
        </div>
    );
}
