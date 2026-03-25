"use client";

import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

type Props = {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};

export default function Drawer({ isOpen, onClose, children }: Props) {
    const drawerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        function handleClickOutside(event: MouseEvent) {
            if (
                drawerRef.current &&
                !drawerRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        }

        function handleEsc(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    return (
        <div
            ref={drawerRef}
            className={` relative
        flex text-primary-foreground
        shadow-2xl shadow-primary border-border
        transition-all duration-500 h-full bg-primary-foreground
        ${isOpen ? "w-full" : "w-0 p-0 overflow-hidden"}
      `}
        >
            <button onClick={onClose} className="absolute rounded-full text-red-500 hover:text-white hover:bg-red-500 cursor-pointer top-2 left-2 p-2">
                <IoClose className="w-6 h-6" />
            </button>
            {children}
        </div>
    );
}
