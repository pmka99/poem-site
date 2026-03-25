import { useState } from "react";
import { useHemistichs } from "../queries/useHemistichs";

export function useHemistichPagination(poemId: string) {

    const [page, setPage] = useState(1);

    const query = useHemistichs(poemId, {
        page,
        limit: 20
    });

    const totalPages = query.data?.meta?.totalPage ?? 1;

    const nextPage = () => {
        if (page < totalPages) {
            setPage(p => p + 1);
        }
    };

    const prevPage = () => {
        if (page > 1) {
            setPage(p => p - 1);
        }
    };

    const goToPage = (p: number) => {
        if (p >= 1 && p <= totalPages) {
            setPage(p);
        }
    };

    return {
        hemistichs: query.data?.data ?? [],
        page,
        setPage,    
        totalPages,
        nextPage,
        prevPage,
        goToPage,
        isLoading: query.isLoading
    };
}
