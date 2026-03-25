import DashboardNavbar from "./navbar";
import DashboardSidebarUser from "./user";




export default function DashboardSidebarContent() {




    return (
        <aside className="h-full w-full flex flex-col justify-between border-border  backdrop-blur">

            <div>
                <div className="h-16 flex items-center px-6 border-b border-border">
                    <span className="text-lg font-semibold text-primary">
                        پنل کاربری
                    </span>
                </div>

                <DashboardNavbar />
            </div>

            <DashboardSidebarUser />

        </aside>

    )
}