import AuthGuard from "@/guard/authGuard";
import DashboardLayoutComponent from "@/layout/dashboard";
import MuiProvider from "@/theme/MuiProvider";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthGuard>
            <MuiProvider>
                <DashboardLayoutComponent>
                    {children}
                </DashboardLayoutComponent>
            </MuiProvider>
        </AuthGuard>
    );
}