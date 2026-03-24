import { useInfiniteHemistichs } from "@/features/poem/protected/hooks"
import HemistichVirtualList from "@/features/poem/protected/components/HemistichVirtualList"
import InfiniteScrollTrigger from "@/features/poem/protected/components/InfiniteScrollTrigger"

type Props = {
    poemId: string;
    onAddfirst: () => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onAddBefore: (id: string) => void;
    onAddAfter: (id: string) => void;
}

export function InfiniteHemistichView({
    poemId,
    onEdit,
    onDelete,
    onAddBefore,
    onAddAfter
}: Props) {

    const query = useInfiniteHemistichs(poemId, {
        limit: 20
    })

    const hemistichs =
        query.data?.pages.flatMap(
            page => page.data ?? []
        ) ?? []

    const loadMore = () => {
        if (query.hasNextPage && !query.isFetchingNextPage) {
            query.fetchNextPage()
        }
    }

    return (
        <>
            <HemistichVirtualList hemistichs={hemistichs} />

            <InfiniteScrollTrigger
                onLoadMore={loadMore}
                disabled={!query.hasNextPage}
            />
        </>
    )
}
