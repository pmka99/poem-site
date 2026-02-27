"use client"

import Drawer from "@/components/drawer";
import React from "react";
import { IoMenu } from "react-icons/io5";
import ThemeToggleButton from "./ThemeToggleButton";
import ReadTypeToggleButton from "./readTypeToggleButton";


export default function SideBar() {

    const [isOpenDrawer, setIsOpenDrawer] = React.useState(false);
    console.log("isOpenDrawer", isOpenDrawer);

    const handleClose = () => {
        setIsOpenDrawer(false);
    }

    return (
        <div className="z-50 right-0 top-0 flex gap-2 fixed">
            <Drawer isOpen={isOpenDrawer} onClose={handleClose} >
                <div className="flex flex-col gap-6 overflow-hidden w-80 h-screen py-2">
                    {/* <ThemeToggleButton /> */}
                    <ReadTypeToggleButton />
                </div>
            </Drawer>
            <button
                onClick={() => setIsOpenDrawer(prev => !prev)}
                className={`text-2xl p-3 
                hover:text-secondary-foreground hover:bg-secondary
                text-primary-foreground bg-primary shadow-lg shadow-primary border-border
                w-fit h-fit flex items-center justify-center
                cursor-pointer rounded-full my-1 ${isOpenDrawer ? "invisible" : "visible"}`}>
                <IoMenu className="w-8 h-8" />
            </button>
        </div>
    );
}