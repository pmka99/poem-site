"use client";

import React from "react";


export default function ReadTypeToggleButton() {

    const [readType, setReadType] = React.useState("infinit-scroll");

    React.useEffect(() => {
        const stored = localStorage.getItem("read-type") || "infinit-scroll";
        if (stored) {
            setReadType(stored);
        }
    }, []);

    const toggleReadType = () => {

        setReadType((prevType) => {
            const newType = prevType === "infinit-scroll" ? "pagination" : "infinit-scroll";
            localStorage.setItem("read-type", newType);
            return newType;
        });
    }

    return (
        <button
            className="bg-background text-foreground borrder-border p-5 rounded-sm
            cursor-pointer hover:bg-secondary hover:text-secondary-foreground
            "
            onClick={toggleReadType}
        >
            {readType === "infinit-scroll" ? "تغییر به نمایش به صورت چند صفحه ای " : "تغییر به نمایش به صورت تمام صفحه ای"}
        </button>
    );
}