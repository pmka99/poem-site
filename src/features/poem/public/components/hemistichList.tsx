import { PoemTypeResponse } from "@/shared/types/poemType.type";
import HemistichItem from "./hemistichItem";
import { HemistichResponse } from "@/shared/types/hemistich.type";
import { poemService } from "../services";

export default async function HemistichList({ hemistichs, poemId }: {
    hemistichs: HemistichResponse[],
    poemId: string
}) {

    const data = await poemService.getById(poemId)
    const layout = (data?.data?.poemType as PoemTypeResponse)?.layout ?? 2;

    const getLayoutClass = (i: number) => {
        if (layout === 2) {
            return i % 2 === 1 ? "mb-8 lg:mb-2 pr-10" : "mb-2 pl-10";
        }

        if (layout === 4) {
            if (i % 4 === 3) return "mb-8 pr-10";
            else if (i % 4 === 1) return "mb-2 pr-10";
            else return "pl-10"
        }

        if (layout === 5) {
            if (i % 5 === 4) return "lg:w-full mb-8 lg:mx-72 pl-10";
            else if (i % 5 === 1 || i % 5 === 3) return "mb-2 pr-10";
            else return "pl-10"
        }

        return "";
    };
    if (!hemistichs.length) {
        return (
            <>
                <div className="text-center py-6 text-gray-500">
                    نیم‌مصرعی وجود ندارد
                </div>

            </>
        );
    }

    const sum = hemistichs.reduce((pre, hemistich) => (pre + hemistich.text.length), 0)

    const averageLengthText = sum / hemistichs.length

    return (
        <div className="flex text-black/90 flex-col py-10">

            <div className="flex flex-wrap w-full">

                {hemistichs.map((h, i) => (
                    <div key={h._id}
                        className={`w-full lg:w-1/2 
                            ${getLayoutClass(i)}
                        `}
                    >
                        <HemistichItem
                            averageLengthText={averageLengthText}
                            hemistich={h}
                        />
                    </div>

                ))}

            </div>

        </div>
    );
}
