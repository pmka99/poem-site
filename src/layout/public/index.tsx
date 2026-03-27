"use client";
import React from "react";
import PublicFooterImage from "./footer/PublicHeaderImage";
import PublicHeaderImage from "./header/PublicHeaderImage";
import PublicSidebar from "./sidebar/index";
import PublicHeader from "./header";


export default function PublicLayoutComponent({ children }: { children: React.ReactNode }) {

    const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);


    return (
        <div className="flex relative w-full flex-col min-h-screen justify-between">
            <PublicSidebar setIsOpenDrawer={setIsOpenDrawer} isOpenDrawer={isOpenDrawer} />

            <PublicHeaderImage />

            <div className="flex flex-col min-h-screen">
                <PublicHeader setIsOpenDrawer={setIsOpenDrawer} isOpenDrawer={isOpenDrawer} />
                <div className="w-full z-10 font-sans min-h-[calc(100vh-5rem)]">
                    {children}
                </div>
            </div>
            <PublicFooterImage />
        </div>
    )
}