import { RoleName } from "@/enum/role"
import Link from "next/link"

const items = [
    { name: "پنل کاربری", href: "/dashboard", roles: [RoleName.ADMIN, RoleName.AUTHOR, RoleName.USER] },
    { name: "اشعار", href: "/dashboard/poems", roles: [RoleName.AUTHOR] },
    { name: "نظرات", href: "/dashboard/comments", roles: [RoleName.ADMIN, RoleName.AUTHOR, RoleName.USER] },
    { name: "کاربران", href: "/dashboard/users", roles: [RoleName.ADMIN] },
    { name: "انواع شعرها", href: "/dashboard/poemTypes", roles: [RoleName.ADMIN] },
    { name: "نقش ها", href: "/dashboard/roles", roles: [RoleName.ADMIN] },
    { name: "تنظیمات", href: "/dashboard/settings", roles: [RoleName.ADMIN, RoleName.AUTHOR] }
]


export default function DashboardNavbar() {

    return (
        <nav className="flex flex-col gap-1 p-4">
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className="px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition"
                >
                    {item.name}
                </Link>
            ))}
        </nav>
    )
}

