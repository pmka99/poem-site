import { PoemTypeResponse } from "@/shared/types/poemType.type";
import HemistichItem from "./hemistichItem";
import { HemistichResponse } from "@/shared/types/hemistich.type";
import { poemService } from "../services";

export default async function HemistichList({ hemistichs, poemId }: {
    hemistichs: HemistichResponse[],
    poemId: string
}) {

    const data = await poemService.getById(poemId)
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
                <div className="text-center py-6 text-gray-500">
                    نیم‌مصرعی وجود ندارد
                </div>

            </>
        );
    }

    return (
        <div className="flex flex-col py-10">

            <div className="flex flex-wrap w-full">

                {hemistichs.map((h, i) => (
                    <div key={h._id}
                        className={`w-full lg:w-1/2 lg:p-1
                            ${getLayoutClass(i)}
                        `}
                    >
                        <HemistichItem
                            key={h._id}
                            hemistich={h}
                        />
                    </div>

                ))}

            </div>

        </div>
    );
}
