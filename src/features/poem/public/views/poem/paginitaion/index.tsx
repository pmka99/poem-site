import HemistichList from "@features/poem/public/components/hemistichList";
import { PoemInfoBox } from "@features/poem/public/components/poemInfoBox";
import PaginationSection from "./paginiation";
import { poemService } from "@/features/poem/public/services";

type Props = {
    poemId: string;
    searchParams: Promise<{
        [key: string]: string | string[] | undefined;
    }>;
}

export default async function PaginationHemistichView({ poemId, searchParams }: Props) {

    const querySearchParams = await searchParams;

    const hemistichs = await poemService.getAllHemistichs(poemId, { ...querySearchParams });

    return (
        <div className="flex flex-col gap-2 px-2 lg:px-16">
            {
                hemistichs.meta?.page === 1 &&
                <PoemInfoBox poemId={poemId} />
            }

            <hr className="border-primary lg:mx-28" />

            <HemistichList poemId={poemId} hemistichs={hemistichs.data ?? []} />

            <hr className="border-primary lg:mx-28" />

            <PaginationSection totalPages={hemistichs.meta?.totalPage as number} />
        </div>
    )
}
