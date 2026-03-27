import HemistichList from "@features/poem/public/components/hemistichList";
import { PoemInfoBox } from "@features/poem/public/components/poemInfoBox";
import PaginationSection from "./paginiation";
import { poemService } from "@/features/poem/protected/services";

export default async function PaginationHemistichView({ poemId }: { poemId: string }) {

    const hemistichs = await poemService.getAllHemistichs(poemId)


    return (
        <div className="flex flex-col gap-2">
            {
                hemistichs.meta?.page === 1 &&
                <PoemInfoBox poemId={poemId} />
            }

            <hr />

            <HemistichList poemId={poemId} hemistichs={hemistichs.data ?? []} />

            <hr/>

            <PaginationSection totalPages={hemistichs.meta?.totalPage as number} />
        </div>
    )
}
