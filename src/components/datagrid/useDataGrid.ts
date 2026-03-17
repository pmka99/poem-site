"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { GridPaginationModel, GridSortModel } from "@mui/x-data-grid";
import { z } from "zod";
import { useEffect, useRef, useState } from "react";

export const gridQuerySchema = z.object({
    page: z.coerce.number().default(0),
    pageSize: z.coerce.number().default(10),
    search: z.string().default(""),
    sortField: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional(),
});

export function useDataGrid({ mode = "client" }: { mode?: "client" | "server" } = {}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const param = (key: string) => searchParams.get(key) ?? undefined;

    const parsed = gridQuerySchema.parse({
        page: param("page"),
        pageSize: param("pageSize"),
        search: param("search"),
        sortField: param("sortField"),
        sortOrder: param("sortOrder"),
    });

    /** ✅ local state */
    const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
        page: parsed.page,
        pageSize: parsed.pageSize,
    });

    const [sortModel, setSortModel] = useState<GridSortModel>(
        parsed.sortField
            ? [{ field: parsed.sortField, sort: parsed.sortOrder }]
            : []
    );

    const [search, setSearch] = useState(parsed.search);

    /** جلوگیری از push در mount اولیه */
    const mounted = useRef(false);

    /** ✅ sync URL ← state */
    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            return;
        }

        const url = new URLSearchParams(searchParams.toString());

        url.set("page", String(paginationModel.page));
        url.set("pageSize", String(paginationModel.pageSize));

        if (search) url.set("search", search);
        else url.delete("search");

        if (sortModel.length) {
            url.set("sortField", sortModel[0].field);
            url.set("sortOrder", sortModel[0].sort!);
        } else {
            url.delete("sortField");
            url.delete("sortOrder");
        }

        router.push(`?${url.toString()}`, { scroll: false });

    }, [paginationModel, sortModel, search]);

    return {
        mode,
        query: {
            ...parsed,
            search,
        },
        paginationModel,
        sortModel,
        setPaginationModel,
        setSortModel,
        setSearch,
    };
}
