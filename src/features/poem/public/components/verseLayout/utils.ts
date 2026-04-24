import { TFontSize } from "@/contexts/readerSettingContext";


export function calculateWidth(averageLengthText: number, fontSize: TFontSize) {
    const widthClass =
        averageLengthText > 32
            ? {
                large: "*:w-70 *:xs:w-78 *:xs2:w-100 *:md:w-130 *:lg:w-150",
                medium: "*:w-68 *:xs:w-76 *:xs2:w-90 *:md:w-120 *:lg:w-120",
                small: "*:w-66 *:xs:w-70 *:xs2:w-80 *:md:w-110 *:lg:w-110",
            }[fontSize]
            : averageLengthText > 27 ? {
                large: "*:w-70 *:xs:w-70 *:xs2:w-100 *:md:w-120 *:lg:w-145",
                medium: "*:w-68 *:xs:w-68 *:xs2:w-90 *:md:w-110 *:lg:w-100",
                small: "*:w-64 *:xs:w-64 *:xs2:w-80 *:md:w-90 *:lg:w-80",
            } : {
                large: "*:w-60 *:xs:w-60 *:xs2:w-85 *:md:w-105 *:lg:w-130",
                medium: "*:w-62 *:xs:w-62 *:xs2:w-75 *:md:w-95 *:lg:w-90",
                small: "*:w-50 *:xs:w-55 *:xs2:w-62 *:md:w-65 *lg:w-70",
            }[fontSize]

    return widthClass
}


export function calculatefontSize(fontSize: TFontSize) {
    const fsClass = {
        large: "**:text-lg **:xs:text-xl **:xs2:text-2xl **:md:text-3xl **:lg:text-4xl",
        medium: "**:text-base **:xs:text-lg **:xs2:text-xl **:md:text-2xl **:lg:text-2xl",
        small: "**:text-sm **:xs:text-base **:xs2:text-lg **:md:text-xl **:lg:text-lg",
    }[fontSize]
    
    return fsClass
}



