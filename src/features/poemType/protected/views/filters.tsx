import { Dispatch, SetStateAction } from "react"
import { TDashboardFiltersPoemTypes } from "."
import { MultiSelect } from "@/components/filters"

type Props = {
    filters: TDashboardFiltersPoemTypes,
    setFilters: Dispatch<SetStateAction<TDashboardFiltersPoemTypes>>
}

export default function DashboardPoemTypesFilters({ filters, setFilters }: Props) {

    const changeMultiSelectHandler = (values: (string | number)[]) => {
        setFilters(prev => ({
            layout: values.map(item => Number(item)),
            search: prev.search
        }))
    }

    const items = [
        { label: "یکی", id: 1 },
        { label: "دو تایی", id: 2 },
        { label: "چهار تایی", id: 4 },
        { label: "پنج تایی", id: 5 }
    ]

    return (
        <div className="py-2 grid grid-cols-4">
            <MultiSelect
                value={filters.layout}
                label="نوع چیدمان"
                items={items}
                onChange={changeMultiSelectHandler}
            />
        </div>
    )

}