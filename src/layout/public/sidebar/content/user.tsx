"use client"

import { useAuth } from "@features/auth/hooks";

export default function PublicSidebarUser() {

    const { data, isLoading } = useAuth();

    const logout = () => {
        console.log("logout")
    }

    return (
        <div className="border-t border-border p-4">

            <div className="flex items-center gap-3 mb-4">
                <img
                    src="https://i.pravatar.cc/100"
                    className="w-10 h-10 rounded-full border border-border"
                />

                <div>
                    <p className="text-sm font-medium text-background">
                        {data?.data?.username}
                    </p>
                    <p className="text-xs text-muted">
                        {data?.data?.phoneNumber}
                    </p>
                </div>
            </div>

            <button
                onClick={logout}
                className="w-full cursor-pointer rounded-md bg-secondary text-secondary-foreground text-sm py-2 hover:opacity-90 transition"
            >
                خروج
            </button>

        </div>
    )
}
