// import { useHemistichContex } from "@/features/poem/protected/context/hemistichContext";
// import HemistichVirtualList from "@/features/poem/protected/components/HemistichVirtualList";
// import InfiniteScrollTrigger from "@/features/poem/protected/components/InfiniteScrollTrigger";

// export default function InfiniteHemistichView() {

//     const ctx = useHemistichContex();

//     if (ctx.mode !== "infinite") return null;

//     const { hemistichs, loadMore, hasNextPage } = ctx;

//     return (
//         <>
//             <HemistichVirtualList hemistichs={hemistichs} />

//             <InfiniteScrollTrigger
//                 onLoadMore={loadMore}
//                 disabled={!hasNextPage}
//             />
//         </>
//     );
// }
