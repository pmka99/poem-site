import DashboardContent from "@/layout/dashboard/content";
import DashboardCategoryView from "@features/category/protected/views";


export default function DashboardPoemPage() {

    return (
        <DashboardContent title="انواع موضوع">
            <DashboardCategoryView />
        </DashboardContent>
    )
}