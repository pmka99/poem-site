import Footer from "./footer";
import Header from "./header";


export default function Layout({ children }: { children: React.ReactNode }) {



    return (
        <div className="flex relative w-full flex-col min-h-screen justify-between">
            <Header />
            <div className="w-full p-1 z-10 py-60 lg:py-20">
                {children}
            </div>
            <Footer />
        </div>
    )
}