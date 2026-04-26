import { HemistichResponse } from "@/shared/types/hemistich.type"
import HemistichItem from "../hemistichItem"
import { TFontSize } from "@/contexts/readerSettingContext"
import { calculatefontSize, calculateWidth1, calculateWidth2 } from "./utils"

type Props = {
    averageLengthText: number
    fontSize: TFontSize
    hemistichs: [HemistichResponse, HemistichResponse, HemistichResponse, HemistichResponse, HemistichResponse]
}


function VerseLayout5_1({ hemistichs, averageLengthText, fontSize }: Props & { fontSize: TFontSize }) {

    const fsClass = calculatefontSize(fontSize)

    const marginClass1 = {
        large: "pb-4",
        medium: "pb-2",
        small: "pb-0",
    }[fontSize]

    const marginClass2 = {
        large: "pb-14",
        medium: "pb-8",
        small: "pb-4",
    }[fontSize]

    const widthClass = calculateWidth1(averageLengthText, fontSize)

    return (
        <div className={`hidden flex-col lg:flex *:justify-center`}>
            <div className={`flex gap-24 ${fsClass} ${marginClass1} ${widthClass}`}>
                <HemistichItem hemistich={hemistichs[0]} averageLengthText={averageLengthText} />
                <HemistichItem hemistich={hemistichs[1]} averageLengthText={averageLengthText} />
            </div>
            <div className={`flex gap-24 ${fsClass} ${marginClass1} ${widthClass}`}>
                <HemistichItem hemistich={hemistichs[2]} averageLengthText={averageLengthText} />
                <HemistichItem hemistich={hemistichs[3]} averageLengthText={averageLengthText} />
            </div>
            <div className={`flex gap-24 ${fsClass} ${marginClass2} ${widthClass}`}>
                <HemistichItem hemistich={hemistichs[4]} averageLengthText={averageLengthText} />
            </div>
        </div>

    )
}


function VerseLayout5_2({ hemistichs, averageLengthText, fontSize }: Props & { fontSize: TFontSize }) {

    const fsClass = calculatefontSize(fontSize)

    const marginClass1 = {
        large: "pb-6",
        medium: "pb-2",
        small: "pb-0",
    }[fontSize]

    const marginClass2 = {
        large: "pb-14",
        medium: "pb-8",
        small: "pb-8",
    }[fontSize]

    const widthClass = calculateWidth2(averageLengthText, fontSize)

    return (
        <div className={`lg:hidden flex flex-col *:md:self-center ${fsClass} ${widthClass}`
        }>
            <div className={`${marginClass1} md:ml-44`}>
                <HemistichItem hemistich={hemistichs[0]} averageLengthText={averageLengthText} />
            </div>
            <div className={`${marginClass1} self-end md:mr-44`}>
                <HemistichItem hemistich={hemistichs[1]} averageLengthText={averageLengthText} />
            </div>
            <div className={`${marginClass1} md:ml-44`}>
                <HemistichItem hemistich={hemistichs[2]} averageLengthText={averageLengthText} />
            </div>
            <div className={`${marginClass1} self-end md:mr-44`}>
                <HemistichItem hemistich={hemistichs[3]} averageLengthText={averageLengthText} />
            </div>
            <div className={`${marginClass1}`}>
                <HemistichItem hemistich={hemistichs[4]} averageLengthText={averageLengthText} />
            </div>
            <hr className={`${marginClass2} border-primary mx-auto`} />
        </div >

    )
}

export default function VerseLayout5({ hemistichs, fontSize, averageLengthText }: Props) {


    return (
        <>
            {/** lg */}
            <VerseLayout5_1 hemistichs={hemistichs} averageLengthText={averageLengthText} fontSize={fontSize} />

            {/** md sm */}
            <VerseLayout5_2 hemistichs={hemistichs} averageLengthText={averageLengthText} fontSize={fontSize} />

        </>
    )
}
