import DashboardContent from "@/layout/dashboard/content";
import DashboardPeomsView from "@/sections/dashboard/poems";


export default function DashboardPoemPage() {



    return (
        <DashboardContent title="شعرها">
            <DashboardPeomsView />
        </DashboardContent>
    )
}