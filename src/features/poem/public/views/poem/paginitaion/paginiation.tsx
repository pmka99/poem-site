"use client"

import MuiProvider from "@/theme/MuiProvider"
import { Pagination, Stack } from "@mui/material"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

export default function PaginationSection({ totalPages }: { totalPages: number }) {

    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const page = Number(searchParams.get("page")) || 1

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", value.toString())

        router.push(`${pathname}?${params.toString()}`)
    }

    return (
        <MuiProvider>
            <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                mt={3}
            >
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handleChange}
                    color="primary"
                    shape="rounded"
                    showFirstButton
                    showLastButton
                    siblingCount={1}
                    boundaryCount={1}
                />
            </Stack>
        </MuiProvider>
    )
}
