import { defineStore } from "pinia";
import { ref } from "vue";
import axiosAdmin from "../../axios/axiosAdmin";


export const useAdminClientStore = defineStore('adminclient', {
    state: () => ({
        clients: [],
        currentClient: [],
        notification: {
            show: false,
            type: null,
            message: null
        },
        isLoading: ref(true)
    }),
    actions: {
        notify({message, type}) {
            this.notification.show = true
            this.notification.type = type
            this.notification.message = message
            setTimeout(() => {
                this.notification.show = false
            }, 3000)
        },
        createClient(client) {
            this.isLoading = true
            return axiosAdmin.post('/clients', client)
                .then((res) => {
                    this.clients = res.data.data
                    this.isLoading = false
                })
        },
        getClients() {
            this.isLoading = true
            return axiosAdmin.get('/clients')
                .then((res) => {
                    this.clients = res.data.data
                    this.isLoading = false
                })
        },
        getClient(id) {
            this.isLoading = true
            return axiosAdmin.get(`/clients/${id}`)
                .then((res) => {
                    this.currentClient = res.data.data
                    this.isLoading = false
                })
        },
        updateClient(client) {
            this.isLoading = true
            return axiosAdmin.put(`/clients/${client.id}`, client)
                .then((res) => {
                    this.currentClient = res.data.data
                    this.isLoading = false
                })
        },
        deleteClient(id) {
            this.isLoading = true
            return axiosAdmin.delete(`/clients/${id}`)
                .then((res) => {
                    this.isLoading = false
                })
        }
    }
})