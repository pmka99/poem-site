import { cookies } from "next/headers";
import { ConfirmProvider } from "./confirmProvider";
import { ModalProvider } from "./modalProvider";
import ReactQueryProvider from "./reactQueryProvider";
import { ReaderSettingProvider } from "./readerSettingProvider";
import { ReadType, TFontSize, TFontStyle } from "@/contexts/readerSettingContext";

export default async function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const readType = (cookieStore.get("read-type")?.value as ReadType) ?? "infinit-scroll";
    const fontSize = (cookieStore.get("font-size")?.value as TFontSize) ?? "medium";
    const fontStyle = (cookieStore.get("font-style")?.value as TFontStyle) ?? "nastaliq";

    return (
        <ReaderSettingProvider initialReadType={readType} initialFontSize={fontSize} initialFontStyle={fontStyle}>
            <ReactQueryProvider>
                <ConfirmProvider>
                    <ModalProvider>
                        {children}
                    </ModalProvider>
                </ConfirmProvider>
            </ReactQueryProvider>
        </ReaderSettingProvider>
    );
}
