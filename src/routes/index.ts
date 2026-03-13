

const publicRoutes = {

}


const dashboardRoutes = {
    poems: { path: "/dashboard/poems", name: "شعرها" }
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