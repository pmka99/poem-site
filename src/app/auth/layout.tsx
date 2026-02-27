import MuiProvider from "@/theme/MuiProvider";
import Image from "next/image";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <MuiProvider>
            <div className="w-full items-center h-screen flex ">
                <div className="flex w-full md:w-3/4 lg:w-2/3 h-96 items-center mx-auto">
                    <div className="w-1/2 h-full items-center">
                        {children}
                    </div>
                    <div className="w-1/2 h-full hidden md:flex bg-accent">
                        <Image
                            src={"/images/bird-down.webp"}
                            alt={"flower"}
                            // fill
                            width={200} height={200}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>
        </MuiProvider>
    );
}