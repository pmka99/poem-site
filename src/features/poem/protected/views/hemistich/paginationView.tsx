import HemistichList from "@/features/poem/protected/components/hemistichList";
import { useHemistichContex } from "@/features/poem/protected/context/hemistichContext";
import { Pagination, Stack } from "@mui/material";

export default function PaginationHemistichView() {

    const ctx = useHemistichContex();

    if (ctx.mode !== "pagination") return null;

    const { page, totalPages, setPage } = ctx;

    const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <>
            <HemistichList />

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
        </>
    );
}
