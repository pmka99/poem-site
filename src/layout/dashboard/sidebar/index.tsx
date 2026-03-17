"use client"

import Drawer from "@/components/drawer";
import React from "react";
import { IoMenu } from "react-icons/io5";
import DashboardSidebarContent from "./content";


export default function DashboardSidebar() {

    const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);

    const handleClose = () => {
        setIsOpenDrawer(false);
    }

    return (
        <>
            <div className="hidden h-screen lg:flex w-64">
                <DashboardSidebarContent />
            </div>

            <div className="lg:hidden z-50 right-0 top-0 h-fit flex fixed gap-2 ">
                <Drawer isOpen={isOpenDrawer} onClose={handleClose} >
                    <div className="flex overflow-hidden w-64 h-screen py-14">
                        <DashboardSidebarContent />
                    </div>
                </Drawer>

                <button
                    onClick={() => setIsOpenDrawer(prev => !prev)}
                    className={`
                        text-2xl p-3
                        hover:text-secondary-foreground hover:bg-secondary
                        text-primary-foreground bg-primary shadow-lg shadow-primary border-border
                        w-fit h-fit flex items-center justify-center
                        cursor-pointer rounded-full my-1 
                        ${isOpenDrawer ? "invisible" : "visible"}    
                        `}
                >
                    <IoMenu className="w-8 h-8" />
                </button>
            </div>
        </>
    );
}
