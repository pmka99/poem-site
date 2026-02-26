
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full h-full  ">
            <div className="absolute top-0 left-0 h-screen z-20 backdrop-blur-xl bg-amber-900" />
            {children}
        </div>
    );
}