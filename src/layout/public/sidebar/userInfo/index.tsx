"use client"

import { authService } from "@/features/auth/services"
import { useEffect } from "react"


export default function UserInfo() {

    useEffect(() => {
        console.log(authService.getUserInfo());
    }, [])

    return (
        <></>
    )
}