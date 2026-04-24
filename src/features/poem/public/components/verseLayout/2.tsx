import { HemistichResponse } from "@/shared/types/hemistich.type"
import HemistichItem from "../hemistichItem"
import { TFontSize } from "@/contexts/readerSettingContext"
import { calculatefontSize, calculateWidth } from "./utils"

type Props = {
  averageLengthText: number
  fontSize: TFontSize
  hemistichs: [HemistichResponse, HemistichResponse]
}



function VerseLayout2_1({ hemistichs, averageLengthText, fontSize }: Props & { fontSize: TFontSize }) {

  const fsClass = calculatefontSize(fontSize)

  const marginClass = {
    large: "pb-6",
    medium: "pb-2",
    small: "pb-0",
  }[fontSize]

  const widthClass = calculateWidth(averageLengthText, fontSize)

  return (
    <div className={`hidden lg:flex ${fsClass} ${marginClass} ${widthClass} justify-center gap-30`}
    >
      <HemistichItem hemistich={hemistichs[0]} averageLengthText={averageLengthText} />
      <HemistichItem hemistich={hemistichs[1]} averageLengthText={averageLengthText} />
    </div >

  )
}



function VerseLayout2_2({ hemistichs, averageLengthText, fontSize }: Props & { fontSize: TFontSize }) {

  const fsClass = calculatefontSize(fontSize)

  const marginClass1 = {
    large: "pb-6",
    medium: "pb-4",
    small: "pb-2",
  }[fontSize]

  const widthClass = calculateWidth(averageLengthText, fontSize)


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
