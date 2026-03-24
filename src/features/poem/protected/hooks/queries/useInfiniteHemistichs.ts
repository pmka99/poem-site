"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { poemService } from "@features/poem/protected/services";
import { poemKeys } from "@/features/poem/protected/hooks/keys";
import { ApiResponse } from "@/shared/types/response.type";
import { HemistichResponse } from "@/shared/types/hemistich.type";

type HemistichQueryParams = {
    page?: number;
    limit?: number;
    text?: string;
    [key: string]: any;
};

export const useInfiniteHemistichs = (
    poemId: string,
    params: HemistichQueryParams = {}
) => {
    const { limit = 20, ...filters } = params;

    return useInfiniteQuery<ApiResponse<HemistichResponse[]>>({
        queryKey: poemKeys.hemistichList(poemId, {
            mode: "infinite",
            limit,
            ...filters,
        }),

        queryFn: ({ pageParam = 1 }) =>
            poemService.getAllHemistichs(poemId, {
                page: pageParam,
                limit,
                ...filters,
            }),

        initialPageParam: 1,

        getNextPageParam: (lastPage) => {
            const currentPage = lastPage.meta?.page ?? 1;
            const totalPage = lastPage.meta?.totalPage ?? 1;

            return currentPage < totalPage
                ? currentPage + 1
                : undefined;
        },
    });
};
