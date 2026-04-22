import  ReaderSetting  from "./readerSetting";
import PublicNavbar from "./navbar";


export default function PublicSidebarContent() {


    return (
        <aside className="h-screen w-full flex flex-col justify-between border-border  backdrop-blur">

            <div>
                {/* <div className="h-16 flex items-center px-6 border-b border-border">
                    <span className="text-lg font-semibold text-primary">
                        پنل کاربری
                    </span>
                </div> */}

                <PublicNavbar />

                <hr className="border-border my-8" />

                <ReaderSetting />


            </div>


        </aside>

    )
}