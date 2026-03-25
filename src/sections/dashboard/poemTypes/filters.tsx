import { Dispatch, SetStateAction } from "react"
import { TDashboardFiltersPoemTypes } from "."
import { MultiSelect } from "@/components/filters"
import { LayoutPoemType } from "@/enum/poemType"
import { LayoutPoemTypeLabels } from "@/shared/labels/poemType"

type Props = {
    filters: TDashboardFiltersPoemTypes,
    setFilters: Dispatch<SetStateAction<TDashboardFiltersPoemTypes>>
}

export default function DashboardPoemTypesFilters({ filters, setFilters }: Props) {

    const changeMultiSelectHandler = (values: (string | number)[]) => {
        setFilters(prev => ({
            layout: values.map(item => item.toString() as LayoutPoemType),
            search: prev.search
        }))
    }

    const items = Object.values(LayoutPoemType).map(item => ({ id: item, label: LayoutPoemTypeLabels[item] }))

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