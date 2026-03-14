import DashboardSidebar from "./sidebar";

export default function DashboardLayoutComponent({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex relative w-full min-h-screen justify-between bg-primary-foreground/90">
            <DashboardSidebar />
            <div className="flex grow flex-col h-full justify-between">

                <main className="flex p-2">
                    {children}
                </main>
            </div>
        </div>
    )
}