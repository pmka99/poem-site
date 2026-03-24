import DashboardContent from "@/layout/dashboard/content";
import DashboardPoemsView from "@/sections/dashboard/poems";

export default function DashboardPoemPage() {

    return (
        <DashboardContent title="شعرها">
            <DashboardPoemsView />
        </DashboardContent>
    )
}