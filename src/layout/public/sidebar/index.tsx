"use client"

import Drawer from "@/components/drawer";
import React from "react";
import { IoMenu } from "react-icons/io5";
import PublicSidebarContent from "./content";


export default function PublicSidebar({
    isOpenDrawer, setIsOpenDrawer
}: { isOpenDrawer: boolean, setIsOpenDrawer: (isOpenDrawer: boolean) => void }) {


    const handleClose = () => {
        setIsOpenDrawer(false);
    }

    return (
        <div className="z-50 h-full fixed">
            <Drawer isOpen={isOpenDrawer} onClose={handleClose} >
                <div className="flex overflow-hidden w-64 h-screen py-14">
                    <PublicSidebarContent />
                </div>
            </Drawer>
        </div>

    );
}
