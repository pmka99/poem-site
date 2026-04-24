import { HemistichResponse } from "@/shared/types/hemistich.type"
import HemistichItem from "../hemistichItem"
import { TFontSize } from "@/contexts/readerSettingContext"

type Props = {
    averageLengthText: number
    fontSize: TFontSize
    hemistichs: [HemistichResponse, HemistichResponse, HemistichResponse, HemistichResponse]
}


function VerseLayout4_1({ hemistichs, averageLengthText, fontSize }: Props & { fontSize: TFontSize }) {

    const fsClass = {
        large: "**:text-4xl",
        medium: "**:text-2xl",
        small: "**:text-lg",
    }[fontSize]

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

    const widthClass =
        averageLengthText > 32
            ? {
                large: "*:w-150",
                medium: "*:w-120",
                small: "*:w-110",
            }[fontSize]
            : {
                large: "*:w-130",
                medium: "*:w-100",
                small: "*:w-80",
            }[fontSize]

    return (
        <div className={`hidden flex-col lg:flex *:justify-center`}>
            <div className={`flex gap-24 ${fsClass} ${marginClass1} ${widthClass}`}>
                <HemistichItem hemistich={hemistichs[0]} averageLengthText={averageLengthText} />
                <HemistichItem hemistich={hemistichs[1]} averageLengthText={averageLengthText} />
            </div>
            <div className={`flex gap-24 ${fsClass} ${marginClass2} ${widthClass}`}>
                <HemistichItem hemistich={hemistichs[2]} averageLengthText={averageLengthText} />
                <HemistichItem hemistich={hemistichs[3]} averageLengthText={averageLengthText} />
            </div>
        </div>

    )
}


function VerseLayout4_2({ hemistichs, averageLengthText, fontSize }: Props & { fontSize: TFontSize }) {

    const fsClass = {
        large: "**:text-lg **:xs:text-xl **:xs2:text-2xl **:md:text-3xl",
        medium: "**:text-base **:xs:text-lg **:xs2:text-xl **:md:text-2xl",
        small: "**:text-sm **:xs:text-base **:xs2:text-lg **:md:text-xl",
    }[fontSize]

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

    const widthClass =
        averageLengthText > 32
            ? {
                large: "*:w-70 *:xs:w-78 *:xs2:w-100 *:md:w-130",
                medium: "*:w-68 *:xs:w-76 *:xs2:w-90 *:md:w-120",
                small: "*:w-66 *:xs:w-70 *:xs2:w-80 *:md:w-110",
            }[fontSize]
            : {
                large: "*:w-70 *:xs:w-70 *:xs2:w-100 *:md:w-120",
                medium: "*:w-68 *:xs:w-68 *:xs2:w-90 *:md:w-110",
                small: "*:w-64 *:xs:w-64 *:xs2:w-80 *:md:w-90",
            }[fontSize]


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
            <hr className={`${marginClass2} border-primary mx-auto`} />
        </div >

    )
}

export default function VerseLayout4({ hemistichs, fontSize, averageLengthText }: Props) {


    return (
        <>
            {/** lg */}
            <VerseLayout4_1 hemistichs={hemistichs} averageLengthText={averageLengthText} fontSize={fontSize} />

            {/** md sm */}
            <VerseLayout4_2 hemistichs={hemistichs} averageLengthText={averageLengthText} fontSize={fontSize} />

        </>
    )
}
