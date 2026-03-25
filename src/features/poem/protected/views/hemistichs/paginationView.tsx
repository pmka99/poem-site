import HemistichList from "@/features/poem/protected/components/HemistichList";
import { useHemistich } from "@/features/poem/protected/context/HemistichContext";

export default function PaginationHemistichView() {

    const ctx = useHemistich();

    if (ctx.mode !== "pagination") {
        return null;
    }

    const { page, totalPages, nextPage, prevPage } = ctx;

    return (
        <>
            <HemistichList />

            <div className="flex justify-center gap-4 mt-6">

                <button
                    onClick={prevPage}
                    disabled={page === 1}
                >
                    قبلی
                </button>

                <span>
                    {page} / {totalPages}
                </span>

                <button
                    onClick={nextPage}
                    disabled={page === totalPages}
                >
                    بعدی
                </button>

            </div>
        </>
    );
}
