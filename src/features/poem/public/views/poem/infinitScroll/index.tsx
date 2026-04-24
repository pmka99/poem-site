"use client";

import HemistichVirtualList from "@/features/poem/public/components/hemistichVirtualList";
import InfiniteScrollTrigger from "@/features/poem/public/components/InfiniteScrollTrigger";
import { poemService } from "@/features/poem/public/services";
import { HemistichResponse } from "@/shared/types/hemistich.type";
import { PoemTypeResponse } from "@/shared/types/poemType.type";
import { useEffect, useState } from "react";
import { PoemInfoBox } from "../../../components/poemInfoBox";


type Props = {
    poemId: string;
}

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

export default function InfiniteHemistichView({ poemId }: Props) {
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [hemistichs, setHemistichs] = useState<HemistichResponse[][]>([]);
    const [layout, setLayout] = useState<number>(2);
    const [averageLengthText, setAverageLengthText] = useState<number>(0);

    useEffect(() => {
        (async () => {
            const poem = await poemService.getById(poemId)
            setLayout((poem?.data?.poemType as PoemTypeResponse)?.layout ?? 2);
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const res = await poemService.getAllHemistichs(poemId, { page });
            setTotalPages(res.meta?.totalPage ?? 0)
            if (!averageLengthText) {
                const sum = res.data?.reduce((pre, hemistich) => (pre + hemistich.text.length), 0) ?? 0
                setAverageLengthText(sum / hemistichs.length)
            }
            const formattedHemistich = formatHemistichs(res.data ?? [], layout) ?? []
            setHemistichs(prev => ([...prev, ...formattedHemistich]))
        })()
    }, [page, layout])

    const loadMore = () => {
        setPage(prev => prev + 1)
    }

    return (
        <div className="flex flex-col gap-2 px-2 lg:px-16">
            <PoemInfoBox poemId={poemId} />

            <hr className="border-primary lg:mx-28" />
            <HemistichVirtualList
                layout={layout}
                averageLengthText={averageLengthText}
                hemistichs={hemistichs ?? []} />

            <InfiniteScrollTrigger
                onLoadMore={loadMore}
                disabled={totalPages === page}
            />
        </div>
    );
}
