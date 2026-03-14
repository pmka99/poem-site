"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/hooks";
import { AllRoutes } from "@/routes";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();

    const { data, isLoading } = useAuth();
    const user = data?.data;

    useEffect(() => {
        if (!isLoading && !user) {
            const returnTo = encodeURIComponent(pathname);
            router.replace(`${AllRoutes.authRoutes.signIn.path}?returnTo=${returnTo}`);
        }
    }, [user, isLoading, pathname, router]);

    if (isLoading || !user) return null;

    return <>{children}</>;
}
