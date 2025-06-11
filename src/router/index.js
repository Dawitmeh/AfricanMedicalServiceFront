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
import { useClientStore } from "@/stores/clients"
import { useAdminStore } from "@/stores/admin"
import { storeToRefs } from "pinia"
import InquiryIndex from "@/views/Admin/Inquiry/InquiryIndex.vue"
import DocumentIndex from "@/views/Admin/Document/DocumentIndex.vue"
import DocumentFormat from "@/views/Admin/Document/DocumentFormat.vue"
import UserIndex from "@/views/Admin/Users/UserIndex.vue"
import StaffIndex from "@/views/Admin/Staffs/StaffIndex.vue"
import HospitalView from "@/views/Admin/Hospital/HospitalView.vue"
import ProductView from "@/views/Admin/Products/ProductView.vue"

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
        meta: { requiresAuth: true, userType: 'client' },
        // beforeEnter: async (to, from, next) => {
        //     const clientStore = useClientStore()

        //     await clientStore.initialize()
        //         if (clientStore.isAuthenticated && clientStore.clients.user_type == 'client') {
        //             next();
        //         } else {
        //             next({name: })
        //         }
        // },
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
        meta: { requiresAuth: true, userType: 'admin' },
        children: [
            {path: '/admindashboard', name: 'AdminDashboard', component: AdminDashboard},

            // hospital
            {path: '/adminhospital', name: 'AdminHospital', component: HospitalIndex},
            {path: '/adminhospitalview/:id', name: 'AdminHospitalView', component: HospitalView},

            // services
            {path: '/adminproducts', name: 'AdminProduct', component: ProductIndex},
            {path: '/adminproductview/:id', name: 'AdminProductView', component: ProductView},
            {path: '/adminpackages', name: 'AdminPackage', component: PackageIndex},

            // Fleets
            {path: '/adminfleet', name: 'AdminFleet', component: FleetIndex},

            // currency
            {path: '/admincurrency', name: 'AdminCurrency', component: CurrencyIndex},

            // Country
            {path: '/admincountry', name: 'AdminCountry', component: CountryIndex},

            // Inquiry
            {path: '/admininquiry', name: 'AdminInquiry', component: InquiryIndex},

            // Document
            {path: '/admindocument', name: 'AdminDocument', component: DocumentIndex},
            {path: '/admindocumenttype', name: 'AdminDocumentType', component: DocumentFormat},

            // Users 
            {path: '/adminclients', name: 'AdminClients', component: UserIndex},
            {path: '/adminstaffs', name: 'AdminStaffs', component: StaffIndex}
        ]
    }

]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})


router.beforeEach((to, from, next) => {
    const clientStore = useClientStore()

    if (!clientStore.clients.token && sessionStorage.getItem('TOKEN')) {
        clientStore.clients.token = sessionStorage.getItem('TOKEN')
        clientStore.clients.data = JSON.parse(sessionStorage.getItem('USER_DATA') || '{}')
        clientStore.clients.user_type = sessionStorage.getItem('USER_TYPE')
    }

    // console.log('USER type', clientStore.clients.user_type)

    if (to.meta.requiresAuth && !clientStore.clients.token) {
        next({ name: 'Login' })
    } else if (to.meta.isGuest && clientStore.clients.token) {
        if (clientStore.clients.user_type === 'client') {
            next({ name: 'ClientDashboard' })
        } else {
            next(false)
        }
    } else {
        next()
    }
})


export default router