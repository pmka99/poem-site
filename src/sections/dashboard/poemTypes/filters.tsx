import { Dispatch, SetStateAction } from "react"
import { TDashboardFiltersPoemTypes } from "."
import { MultiSelect } from "@/components/filters"

type Props = {
    filters: TDashboardFiltersPoemTypes,
    setFilters: Dispatch<SetStateAction<TDashboardFiltersPoemTypes>>
}

export default function DashboardFiltersPoemTypes({ filters, setFilters }: Props) {

    const changeMultiSelectHandler = (values: (string | number)[]) => {
        setFilters(prev => ({
            poemType: values.map(item => item.toString()),
            search: prev.search
        }))
    }

    const items = [
        { id: 1, label: "1" }
    ];

    return (
        <div className="py-2 grid grid-cols-4">
            <MultiSelect
                label="نوع شعر"
                items={items}
                onChange={changeMultiSelectHandler}
            />
        </div>
    )

}