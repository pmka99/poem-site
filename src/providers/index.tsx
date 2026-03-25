import { cookies } from "next/headers";
import { ConfirmProvider } from "./confirmProvider";
import { ModalProvider } from "./modalProvider";
import ReactQueryProvider from "./reactQueryProvider";
import { ReadTypeProvider } from "./readTypeProvider";
import { ReadType } from "@/contexts/readTypeContext";

export default async function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const readType = (cookieStore.get("read-type")?.value as ReadType) ?? "infinit-scroll";
    return (
        <ReadTypeProvider initialReadType={readType}>
            <ReactQueryProvider>
                <ConfirmProvider>
                    <ModalProvider>
                        {children}
                    </ModalProvider>
                </ConfirmProvider>
            </ReactQueryProvider>
        </ReadTypeProvider>
    );
}
