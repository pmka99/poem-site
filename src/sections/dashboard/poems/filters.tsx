import { Dispatch, SetStateAction } from "react"
import { TDashboardFiltersPoems } from "."
import { MultiSelect } from "@/components/filters"

type Props = {
    filters: TDashboardFiltersPoems,
    setFilters: Dispatch<SetStateAction<TDashboardFiltersPoems>>
}

export default function DashboardFiltersPoems({ filters, setFilters }: Props) {

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
                value={filters.poemType}
                label="نوع شعر"
                items={items}
                onChange={changeMultiSelectHandler}
            />
        </div>
    )

}