"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@features/auth/hooks";

export default function GuestGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { data, isLoading } = useAuth();
    const user = data?.data;

    const returnTo = searchParams.get("returnTo");

    useEffect(() => {
        if (!isLoading && user) {
            router.replace(returnTo || "/dashboard");
        }
    }, [user, isLoading, returnTo, router]);

    if (isLoading) return null;

    return <>{children}</>;
}
