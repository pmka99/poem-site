import DashboardContent from "@/layout/dashboard/content";
import DashboardPoemsHemistichView from "@features/poem/protected/views/hemistichs"

export default async function DashboardPoemHemistichPage({
    params,
}: {
    params: Promise<{ poemId: string }>;
}) {

    const poemId = await (await params).poemId;

    return (
        <DashboardContent title="ابیات">
            <DashboardPoemsHemistichView poemId={poemId} />
        </DashboardContent>
    );
}
