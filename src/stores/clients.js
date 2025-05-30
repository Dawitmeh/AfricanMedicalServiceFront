import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";


export const useClientStore = defineStore('clients', {
    state: () => ({
        clients: {
            data: JSON.parse(sessionStorage.getItem('USER_DATA')) || {},
            token: sessionStorage.getItem('TOKEN') || null,
        },
        errMsg: [],
        notification: {
            show: false,
            type: null,
            message: null
        }, 
        isLoading: ref(true),
        countries: []
    }),
    getters: {
        isAuthenticated: (state) => !!state.clients.token
    },
    actions: {
        notify({message, type}) {
            this.notification.show = true
            this.notification.type = type
            this.notification.message = message
            setTimeout(() => {
                this.notification.show = false
            }, 3000)
        },
        register(client) {
            return axiosClient.post('/register', client)
                .then(({ data }) => {
                    this.clients.data = data.user
                    this.clients.token = data.token
                    sessionStorage.setItem('TOKEN', data.token)
                    sessionStorage.setItem('USER_DATA', JSON.stringify(data.user))
                })
        },
        login(client) {
            return axiosClient.post('/login', client)
                .then(({ data }) => {
                    this.clients.data = data.user
                    this.clients.token = data.token
                    sessionStorage.setItem('TOKEN', data.token)
                    sessionStorage.setItem('USER_DATA', JSON.stringify(data.user))
                })
                .catch((err) => {
                    this.errMsg = err.response.data ? err.response.data : "Access denied."
                    setTimeout(() => {
                        this.errMsg = false
                    }, 3000)
                })
        },
        logout() {
            this.clients.data = {}
            this.clients.token = null;

            sessionStorage.removeItem('TOKEN');
            sessionStorage.removeItem('USER_DATA')
        },
        getCountries() {
            return axiosClient.get('/countries')
                .then((res) => {
                    this.countries = res.data.data
                })
        }
    }
})