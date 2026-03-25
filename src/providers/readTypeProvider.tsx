"use client";

import { ReadType, ReadTypeContext } from "@/contexts/readTypeContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function ReadTypeProvider({
    children,
    initialReadType,
}: {
    children: React.ReactNode;
    initialReadType: ReadType;
}) {
    const [readType, setReadType] = useState<ReadType>(initialReadType);

    const router = useRouter();
    const toggleReadType = () => {
        const newType =
            readType === "infinit-scroll" ? "pagination" : "infinit-scroll";

        setReadType(newType);

        localStorage.setItem("read-type", newType);
        document.cookie = `read-type=${newType}; path=/`;
        router.refresh()
    };

    return (
        <ReadTypeContext.Provider value={{ readType, toggleReadType }
        }>
            {children}
        </ReadTypeContext.Provider>
    );
}