import PublicFooter from "./footer";
import PublicHeader from "./header";
import PublicSidebar from "./sidebar/index";


export default function PublicLayoutComponent({ children }: { children: React.ReactNode }) {



    return (
        <div className="flex relative w-full flex-col min-h-screen justify-between">
            <PublicSidebar />
            <div className="flex w-full flex-col h-full justify-between">
                <PublicHeader />
                <div className="w-full p-1 z-10 py-60 lg:py-20 font-sans">
                    {children}
                </div>
                <PublicFooter />
            </div>
        </div>
    )
}