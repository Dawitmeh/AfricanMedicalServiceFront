// import './assets/main.css'
import './index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useClientStore } from './stores/clients'
import { useAdminStore } from './stores/admin'

// createApp(App).mount('#app')

const app = createApp(App)
app.use(createPinia())

const userStore = useClientStore();
const adminStore = useAdminStore()
if (sessionStorage.getItem('TOKEN')) {
    userStore.clients.token = sessionStorage.getItem('TOKEN');
    userStore.clients.data = JSON.parse(sessionStorage.getItem('USER_DATA') || '{}');
    userStore.clients.user_type = sessionStorage.getItem('USER_TYPE') || '';

    // admin
    adminStore.admin.token = sessionStorage.getItem('TOKEN')
    adminStore.admin.data = JSON.parse(sessionStorage.getItem('USER_DATA') || '{}')
    adminStore.admin.user_type = sessionStorage.getItem('USER_TYPE') || ''
}

import '../node_modules/flowbite-vue/dist/index.css'

app.use(router)
app.mount('#app')


