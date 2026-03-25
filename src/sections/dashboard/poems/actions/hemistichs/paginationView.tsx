import { useHemistichs } from "@/features/poem/protected/hooks"
import HemistichList from "@/features/poem/protected/components/HemistichList"
import { useState } from "react"
import { Button, IconButton } from "@mui/material"
import { FiPlus } from "react-icons/fi"
import { Position } from "@/enum/poem"
import { SelectedHemistichRange } from "@/features/poem/protected/types"

type Props = {
    poemId: string;
    onAddfirst: () => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onAddBefore: (id: string) => void;
    onAddAfter: (id: string) => void;
    onMove: (range: SelectedHemistichRange, targetId: string, position: Position) => void;
}

export function DashboardPaginationHemistichView({
    poemId,
    onAddfirst,
    onEdit,
    onDelete,
    onAddBefore,
    onAddAfter,
    onMove
}: Props) {


    const [page, setPage] = useState(1)

    const { data } = useHemistichs(poemId, {
        page,
        limit: 20
    })

    const hemistichs = data?.data ?? []



    return (
        <div className="flex flex-col h-full grow">
            {data?.meta?.total === 0 &&
                <IconButton title="افزودن مصرع جدید" onClick={onAddfirst}>
                    <FiPlus />
                </IconButton>
            }
            <HemistichList
                hemistichs={hemistichs}
                onEdit={onEdit}
                onDelete={onDelete}
                onAddAfter={onAddAfter}
                onAddBefore={onAddBefore}
                onMove={onMove}
            />

            <div className="flex items-center gap-3 mt-6">
                <Button
                    size="small"
                    variant="contained"
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                >
                    قبلی
                </Button>
                <span className="text-primary">
                    {page}
                </span>
                <Button
                    size="small"
                    variant="contained"
                    disabled={page === data?.meta?.totalPage}
                    onClick={() => setPage(p => p + 1)}>
                    بعدی
                </Button>
            </div>
        </div>
    )
}
