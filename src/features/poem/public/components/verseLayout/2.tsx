import { HemistichResponse } from "@/shared/types/hemistich.type"
import HemistichItem from "../hemistichItem"

type Props = {
  averageLengthText: number
  hemistichs: [HemistichResponse, HemistichResponse]
}

export default function VerseLayout2({ hemistichs, averageLengthText }: Props) {


  return (
    <>
      {/** lg */}
      <div className={`hidden justify-center gap-24 lg:flex mb-2 ${averageLengthText > 32 ? "*:w-130 " : "*:w-100"}`}>
        <HemistichItem hemistich={hemistichs[0]} averageLengthText={averageLengthText} />
        <HemistichItem hemistich={hemistichs[1]} averageLengthText={averageLengthText} />
      </div>

      {/** md sm */}
      <div className={`lg:hidden *:md:self-center **:text-base **:xs:text-lg **:xs2:text-xl **:md:text-2xl flex flex-col ${averageLengthText > 32 ? "*:w-70 *:xs:w-78 *:xs2:w-100 *:md:w-130" : "*:w-75"}`}>
        <div className="md:ml-44">
          <HemistichItem hemistich={hemistichs[0]} averageLengthText={averageLengthText} />
        </div>
        <div className="mb-6 self-end md:mr-44">
          <HemistichItem hemistich={hemistichs[1]} averageLengthText={averageLengthText} />
        </div>
      </div>

    </>
  )
}
