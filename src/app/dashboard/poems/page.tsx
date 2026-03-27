import DashboardContent from "@/layout/dashboard/content";
import DashboardPoemsView from "@features/poem/protected/views/poem";

export default function DashboardPoemPage() {

    return (
        <DashboardContent title="شعرها">
            <DashboardPoemsView />
        </DashboardContent>
    )
}