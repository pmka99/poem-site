import { Dispatch, SetStateAction } from "react"
import { TDashboardFiltersPoems } from "."
import { MultiSelect, SingleSelect } from "@/components/filters"
import { poemTypeHooks } from "@/api/hooks/poemType.hooks"

type Props = {
    filters: TDashboardFiltersPoems,
    setFilters: Dispatch<SetStateAction<TDashboardFiltersPoems>>
}

export default function DashboardFiltersPoems({ filters, setFilters }: Props) {

    const changeSelectHandler = (value: string | number) => {
        setFilters(prev => ({
            poemType: value.toString(),
            search: prev.search
        }))
    }

    const { data, isLoading } = poemTypeHooks.useList();

    const items = data?.data?.map(item => ({ id: item._id, label: item.name })
    ) ?? []

    return (
        <div className="py-2 grid grid-cols-4">
            <SingleSelect
                value={filters.poemType}
                label="نوع شعر"
                items={items}
                onChange={changeSelectHandler}
            />
        </div>
    )

}