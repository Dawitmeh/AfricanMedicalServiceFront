import { createRouter, createWebHistory } from "vue-router"
import LoginView from "@/views/Client/Auth/LoginView.vue"
import RegisterView from "@/views/Client/Auth/RegisterView.vue"
import AdminLogin from "@/views/Admin/Auth/AdminLogin.vue"
import AdminDefaultComponent from "@/components/Admin/AdminDefaultComponent.vue"
import AdminDashboard from "@/views/Admin/AdminDashboard.vue"
import HospitalIndex from "@/views/Admin/Hospital/HospitalIndex.vue"
import ProductIndex from "@/views/Admin/Products/ProductIndex.vue"
import PackageIndex from "@/views/Admin/Packages/PackageIndex.vue"
import FleetIndex from "@/views/Admin/Fleets/FleetIndex.vue"
import CurrencyIndex from "@/views/Admin/Currency/CurrencyIndex.vue"
import CountryIndex from "@/views/Admin/Country/CountryIndex.vue"
import ClientDefaultLayout from "@/components/Client/ClientDefaultLayout.vue"
import ClientDashboard from "@/views/Client/ClientDashboard.vue"

const routes = [

    {
        path: '/auth',
        name: 'Auth',
        redirect: '/login',
        meta: { isGuest: true},
        children: [
            {
                path: '/login',
                name: 'Login',
                component: LoginView
            },
            {
                path: '/register',
                name: 'Register',
                component: RegisterView
            }
        ]
    },
    
    {
        path: '/',
        redirect: '/dashboard',
        component: ClientDefaultLayout,
        meta: { requiresAuth: true },
        children: [
            {path: '/dashboard', name: 'ClientDashboard', component: ClientDashboard},
            // {path: '/'}
        ]
    },

    {
        path: '/adminAuth',
        name: 'adminAuth',
        redirect: '/adminlogin',
        children: [
            {
                path: '/adminlogin',
                name: 'AdminLogin',
                component: AdminLogin
            },
        ]
    },
    
    // Admin Dashboard
    {
        path: '/admin',
        redirect: '/admindashboard',
        component: AdminDefaultComponent,
        meta: { requiresAuth: true },
        children: [
            {path: '/admindashboard', name: 'AdminDashboard', component: AdminDashboard},

            // hospital
            {path: '/adminhospital', name: 'AdminHospital', component: HospitalIndex},

            // services
            {path: '/adminproducts', name: 'AdminProduct', component: ProductIndex},
            {path: '/adminpackages', name: 'AdminPackage', component: PackageIndex},

            // Fleets
            {path: '/adminfleet', name: 'AdminFleet', component: FleetIndex},

            // currency
            {path: '/admincurrency', name: 'AdminCurrency', component: CurrencyIndex},

            // Country
            {path: '/admincountry', name: 'AdminCountry', component: CountryIndex},
        ]
    }

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})




export default router