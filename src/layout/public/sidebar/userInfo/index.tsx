"use client"

import { authService } from "@/api/services/auth/auth.service"
import { useEffect } from "react"


export default function UserInfo() {

    useEffect(() => {
        console.log(authService.getUserInfo());
    }, [])

    return (
        <></>
    )
}