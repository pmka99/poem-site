

import { HemistichResponse } from "@/shared/types/hemistich.type";
import HemistichItem from "./HemistichItem";
import { useState } from "react";
import { boolean } from "zod";

type Props = {
    hemistichs: HemistichResponse[];

    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    onAddBefore?: (id: string) => void;
    onAddAfter?: (id: string) => void;
};

export default function HemistichList({
    hemistichs,
    onEdit,
    onDelete,
    onAddBefore,
    onAddAfter,
}: Props) {

    const [activeId, setActiveId] = useState<string | null>(null)

    if (!hemistichs.length) {
        return (
            <div className="text-center py-6 text-gray-500">
                نیم‌مصرعی وجود ندارد
            </div>
        );
    }

    return (
        <div className="grid grow lg:grid-cols-2">

            {hemistichs.map((h, i) => (
                <div className={`${i % 2 === 0 ? "lg:mb-0" : "mb-3" }`}>
                    <HemistichItem
                        key={h._id}
                        isActive={h._id === activeId}
                        setActive={() => setActiveId(h._id)}
                        hemistich={h}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onAddBefore={onAddBefore}
                        onAddAfter={onAddAfter}
                    />
                </div>
            ))}

        </div>
    );
}
