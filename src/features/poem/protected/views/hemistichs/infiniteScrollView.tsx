import { useHemistich } from "@/features/poem/protected/context/HemistichContext";
// import HemistichVirtualList from "@/features/poem/protected/components/HemistichVirtualList";
import InfiniteScrollTrigger from "@/features/poem/protected/components/InfiniteScrollTrigger";

export default function InfiniteHemistichView() {

    const ctx = useHemistich();

    if (ctx.mode !== "infinite") return null;

    const { hemistichs, loadMore, hasNextPage } = ctx;

    return (
        <>
            {/* <HemistichVirtualList hemistichs={hemistichs} /> */}

            <InfiniteScrollTrigger
                onLoadMore={loadMore}
                disabled={!hasNextPage}
            />
        </>
    );
}
