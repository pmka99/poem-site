import DashboardContent from "@/layout/dashboard/content";
import DashboardPeomTypesView from "@/sections/dashboard/poemTypes";


export default function DashboardPoemPage() {



    return (
        <DashboardContent title="انواع شعر">
            <DashboardPeomTypesView />
        </DashboardContent>
    )
}