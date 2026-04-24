import { HemistichResponse } from "@/shared/types/hemistich.type";

function Hemistich({ children }: { children: React.ReactNode }) {

    const hemistich = children?.toLocaleString() || "";

    const parts = hemistich.split(" ").filter(part => part.trim().length > 0);

    return (
        <div className="w-full select-none">
            <p aria-hidden="true" className="w-full flex justify-between text-justify">
                {parts.map((part, index) => (
                    <span key={index} className="inline-block">
                        {part}
                    </span>
                ))}
            </p>
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
