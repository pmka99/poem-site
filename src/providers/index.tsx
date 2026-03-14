"use client";

import { ConfirmProvider } from "./confirmProvider";
import { ModalProvider } from "./modalProvider";
import ReactQueryProvider from "./reactQueryProvider";


export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ReactQueryProvider>
            <ConfirmProvider>
                <ModalProvider>
                    {children}
                </ModalProvider>
            </ConfirmProvider>
        </ReactQueryProvider>
    )
}
