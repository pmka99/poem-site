import AuthGuard from "@/guard/authGuard";
import MuiProvider from "@/theme/MuiProvider";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AuthGuard>
            <MuiProvider>
                {children}
            </MuiProvider>
        </AuthGuard>
    );
}