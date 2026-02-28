import Footer from "./footer";
import Header from "./header";
import SideBar from "./sidebar";


export default function LayoutComponent({ children }: { children: React.ReactNode }) {



    return (
        <div className="flex relative w-full flex-col min-h-screen justify-between">
            <SideBar />
            <Header />
            <div className="w-full p-1 z-10 py-60 lg:py-20">
                {children}
            </div>
            <Footer />
        </div>
    )
}