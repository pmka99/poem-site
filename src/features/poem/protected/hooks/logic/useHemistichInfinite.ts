import { useMemo, useCallback } from "react";
import { useInfiniteHemistichs } from "../queries/useInfiniteHemistichs";

export function useHemistichInfinite(poemId: string) {

    const query = useInfiniteHemistichs(poemId, {
        limit: 20,
    });

    const hemistichs = useMemo(() =>
        query.data?.pages.flatMap(page => page.data ?? []) ?? []
        , [query.data]);

    const loadMore = useCallback(() => {

        if (!query.hasNextPage) return;
        if (query.isFetchingNextPage) return;

        query.fetchNextPage();

    }, [query]);

    return {
        hemistichs,
        loadMore,
        total: 0,
        hasNextPage: query.hasNextPage ?? false,
        isLoading: query.isLoading,
        isFetchingNextPage: query.isFetchingNextPage,
    };
}
