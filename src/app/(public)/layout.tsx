import PublicLayoutComponent from "@/layout/public";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PublicLayoutComponent>
      {children}
    </PublicLayoutComponent>
  );
}