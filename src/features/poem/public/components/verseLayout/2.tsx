import { HemistichResponse } from "@/shared/types/hemistich.type"
import HemistichItem from "../hemistichItem"
import { TFontSize } from "@/contexts/readerSettingContext"

type Props = {
  averageLengthText: number
  fontSize: TFontSize
  hemistichs: [HemistichResponse, HemistichResponse]
}



function VerseLayout2_1({ hemistichs, averageLengthText, fontSize }: Props & { fontSize: TFontSize }) {

  const fsClass = {
    large: "**:text-4xl",
    medium: "**:text-2xl",
    small: "**:text-lg",
  }[fontSize]

  const marginClass = {
    large: "pb-6",
    medium: "pb-2",
    small: "pb-0",
  }[fontSize]

  const widthClass =
    averageLengthText > 32
      ? {
        large: "*:w-150",
        medium: "*:w-120",
        small: "*:w-110",
      }[fontSize]
      : {
        large: "*:w-150",
        medium: "*:w-100",
        small: "*:w-80",
      }[fontSize]


  return (
    <div className={`hidden lg:flex ${fsClass} ${marginClass} ${widthClass} justify-center gap-30`}
    >
      <HemistichItem hemistich={hemistichs[0]} averageLengthText={averageLengthText} />
      <HemistichItem hemistich={hemistichs[1]} averageLengthText={averageLengthText} />
    </div >

  )
}



function VerseLayout2_2({ hemistichs, averageLengthText, fontSize }: Props & { fontSize: TFontSize }) {

  const fsClass = {
    large: "**:text-lg **:xs:text-xl **:xs2:text-2xl **:md:text-3xl",
    medium: "**:text-base **:xs:text-lg **:xs2:text-xl **:md:text-2xl",
    small: "**:text-sm **:xs:text-base **:xs2:text-lg **:md:text-xl",
  }[fontSize]

  const marginClass1 = {
    large: "pb-6",
    medium: "pb-4",
    small: "pb-2",
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
      <div className="md:ml-44">
        <HemistichItem hemistich={hemistichs[0]} averageLengthText={averageLengthText} />
      </div>
      <div className={`${marginClass1} self-end md:mr-44`}>
        <HemistichItem hemistich={hemistichs[1]} averageLengthText={averageLengthText} />
      </div>
    </div >

  )
}


export default function VerseLayout2({ hemistichs, fontSize, averageLengthText }: Props) {



  return (
    <>
      {/** lg */}
      <VerseLayout2_1 hemistichs={hemistichs} averageLengthText={averageLengthText} fontSize={fontSize} />

      {/** md sm */}
      <VerseLayout2_2 hemistichs={hemistichs} averageLengthText={averageLengthText} fontSize={fontSize} />

    </>
  )
}
