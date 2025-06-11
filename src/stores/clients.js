import { defineStore } from "pinia";
import { ref } from "vue";
import axiosClient from "../../axios/axiosClient";


export const useClientStore = defineStore('clients', {
    state: () => ({
        clients: {
            data: JSON.parse(sessionStorage.getItem('USER_DATA')) || {},
            token: sessionStorage.getItem('TOKEN') || null,
            user_type: ''
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
        initialize() {
            return new Promise((resolve) => {
                // console.log('Initializing client store...');
                const token = sessionStorage.getItem('TOKEN');
                const user_type = sessionStorage.getItem('user_type') === 'client';
                
                if (token) {
                    // console.log('Token found:', token);
                    this.clients.token = token;
                    this.clients.user_type = user_type;
                } else {
                    // console.log('No token found, clearing user.');
                    this.clearUser();
                }
                
                this.isLoading = false;
                // console.log('Initialization complete.');
                resolve();
            });
        },
        setUser(user) {
            this.clients.data = user;
            this.clients.token = user.token;
            sessionStorage.setItem('TOKEN', user.token);
            sessionStorage.setItem('user_type', user.user_type)
        },
        clearUser() {
            this.user = { data: {}, token: null };
            sessionStorage.removeItem('TOKEN');
            sessionStorage.removeItem('user_type')
        },
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
                    this.clients.user_type = data.user.userType
                    sessionStorage.setItem('TOKEN', data.token)
                    sessionStorage.setItem('USER_DATA', JSON.stringify(data.user))
                    sessionStorage.setItem('USER_TYPE', data.user.userType)
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