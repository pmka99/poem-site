import DashboardContent from "@/layout/dashboard/content";
import DashboardPoemTypesView from "@features/poemType/protected/views";


export default function DashboardPoemPage() {

    return (
        <DashboardContent title="انواع شعر">
            <DashboardPoemTypesView />
        </DashboardContent>
    )
}