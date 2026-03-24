import DashboardContent from "@/layout/dashboard/content";
import DashboardPoemTypesView from "@/sections/dashboard/poemTypes";


export default function DashboardPoemPage() {

    return (
        <DashboardContent title="انواع شعر">
            <DashboardPoemTypesView />
        </DashboardContent>
    )
}