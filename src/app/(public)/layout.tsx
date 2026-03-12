import LayoutComponent from "@/layout";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LayoutComponent>
      {children}
    </LayoutComponent>
  );
}