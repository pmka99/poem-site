import LayoutComponent from "@/layout";

export default function Layout({
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