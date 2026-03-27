

const publicRoutes = {

}


const dashboardRoutes = {
    poems: { path: "/dashboard/poems", name: "شعرها" },
    poemTypes: { path: "/dashboard/poemTypes", name: "انواع شعر" },
    categories: { path: "/dashboard/categories", name: "انواع موضوع" }
}

const authRoutes = {
    signIn: { path: "/auth/sign-in", name: "ورود" },
    singUp: { path: "/auth/sign-up", name: "ثبت نام" }
}






export const AllRoutes = {
    publicRoutes,
    dashboardRoutes,
    authRoutes
}