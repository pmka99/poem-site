import { PoemTypeResponse } from "@/shared/types/poemType.type";
import HemistichItem from "./hemistichItem";
import { HemistichResponse } from "@/shared/types/hemistich.type";
import { poemService } from "../services";
import VerseLayout2 from "./verseLayout/2";
import VerseLayout4 from "./verseLayout/4";
import VerseLayout5 from "./verseLayout/5";
import { TFontSize } from "@/contexts/readerSettingContext";
import { cookies } from "next/headers";

function formatHemistichs(hemistichs: HemistichResponse[], layout: number) {
    const newFormatedHemistichs: HemistichResponse[][] = []
    let verse: HemistichResponse[] = []

    switch (layout) {
        case 2:
            hemistichs.forEach((item, index) => {
                verse.push(item)
                if (index % 2 === 1) {
                    newFormatedHemistichs.push(verse)
                    verse = []
                }
            })
            return newFormatedHemistichs
            break;
        case 4:
            hemistichs.forEach((item, index) => {
                verse.push(item)
                if (index % 4 === 3) {
                    newFormatedHemistichs.push(verse)
                    verse = []
                }
            })
            return newFormatedHemistichs
            break;
        case 5:
            hemistichs.forEach((item, index) => {
                verse.push(item)
                if (index % 5 === 4) {
                    newFormatedHemistichs.push(verse)
                    verse = []
                }
            })
            return newFormatedHemistichs
            break;
    }
}

export default async function HemistichList({ hemistichs, poemId }: {
    hemistichs: HemistichResponse[],
    poemId: string,
}) {

    const cookieStore = await cookies();
    const cookieValue = cookieStore.get("font-size")?.value;

    const fontSize: TFontSize = (["small", "medium", "large"] as const).includes(
        cookieValue as any
    )
        ? (cookieValue as TFontSize)
        : "large";

    const data = await poemService.getById(poemId)
    const layout = (data?.data?.poemType as PoemTypeResponse)?.layout ?? 2;

    if (!hemistichs.length) {
        return (
            <>
                <div className="text-center py-6 text-gray-500">
                    مصرعی وجود ندارد
                </div>

            </>
        );
    }

    const sum = hemistichs.reduce((pre, hemistich) => (pre + hemistich.text.length), 0)

    const averageLengthText = sum / hemistichs.length

    const formattedHemistich = formatHemistichs(hemistichs, layout)

    return (
        <div className="flex text-black/90 flex-col py-10">

            <div className="flex flex-col px-2 overflow-hidden">
                {
                    formattedHemistich?.map(item => (
                        layout === 2
                            ? <VerseLayout2 key={item[0]._id} fontSize={fontSize} hemistichs={item as any} averageLengthText={averageLengthText} />
                            : layout === 4 ? <VerseLayout4 key={item[0]._id} fontSize={fontSize} hemistichs={item as any} averageLengthText={averageLengthText} />
                                : layout === 5 ? <VerseLayout5 key={item[0]._id} fontSize={fontSize} hemistichs={item as any} averageLengthText={averageLengthText} />
                                    : <></>
                    ))

                }
            </div>

        </div>
    );
}
