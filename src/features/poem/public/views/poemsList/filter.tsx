"use client";

import { MultiSelect } from "@/components/filters";
import { useCategorys } from "@/features/category/public/hooks";
import { usePoemTypes } from "@/features/poemType/public/hooks";
import MuiProvider from "@/theme/MuiProvider";
import { TextField } from "@mui/material";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const FilterInput = ({ label, children }: { label: string, children: React.ReactNode }) => (
    <div className="flex gap-1 items-center h-full">
        <label className="w-fit h-full min-w-fit items-center text-nowrap">{label} : </label>
        {children}

    </div>
)

export default function ListFilter() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchInput, setSearchInput] = useState(searchParams.get("search") ?? "");

    const poemTypesValues = searchParams.get("poemTypes")?.split(",") ?? [];
    const categoriesValues = searchParams.get("categories")?.split(",") ?? [];

    const updateQuery = (key: string, value?: string) => {
        const params = new URLSearchParams(window.location.search);

        if (!value || value.length === 0) {
            params.delete(key);
        } else {
            params.set(key, value);
        }

        router.replace(`${pathname}?${params.toString()}`);
    };

    // debounce search
    const oldSearch = searchParams.get("search") ?? "";

    useEffect(() => {
        const timer = setTimeout(() => {
            // Combine search and page update into one call
            const params = new URLSearchParams(window.location.search);
            params.set("search", searchInput);
            if (searchInput !== oldSearch) {
                params.set("page", "1");
            } else {
                // Optional: if search is cleared, reset page too.
                // If you want to keep the page when search is cleared, remove this else block.
                // params.set("page", "1");
            }
            router.replace(`?${params.toString()}`);

        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput]);


    const poemTypesMultiSelectHandler = (values: (string | number)[]) => {
        updateQuery(
            "poemTypes",
            values.map(v => String(v)).join(",")
        );
    };

    const categoriesMultiSelectHandler = (values: (string | number)[]) => {
        updateQuery(
            "categories",
            values.map(v => String(v)).join(",")
        );
    };

    const { data: poemTypes } = usePoemTypes();
    const { data: categories } = useCategorys();

    const poemTypesItems =
        poemTypes?.data?.map(item => ({
            id: item._id,
            label: item.name,
        })) ?? [];

    const categoriesItems =
        categories?.data?.map(item => ({
            id: item._id,
            label: item.title,
        })) ?? [];

    return (
        <MuiProvider>
            <div className="grid grid-cols-1 rounded-sm gap-2 p-3 lg:mx-80">
                
                <FilterInput label="جستجو">
                    <TextField
                        className="*:bg-white w-full"
                        size="small"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </FilterInput>

                {/* <FilterInput label="انواع شعر">
                    <MultiSelect
                        value={poemTypesValues}
                        items={poemTypesItems}
                        onChange={poemTypesMultiSelectHandler}
                    />
                </FilterInput>

                <FilterInput label="انواع موضوعات">
                    <MultiSelect
                        value={categoriesValues}
                        items={categoriesItems}
                        onChange={categoriesMultiSelectHandler}
                    />
                </FilterInput> */}




            </div>
        </MuiProvider>
    );
}
